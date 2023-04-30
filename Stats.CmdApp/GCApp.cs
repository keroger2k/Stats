using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Models;
using Stats.ExtApi.Services;
using static Stats.Database.Models.TeamTransform;

namespace Stats.CmdApp
{
    public  class GCApp
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly IMapper _mapper;
        private readonly StatsOut _statsOut;

        public GCApp(ILogger<GCApp> logger, IConfiguration configuration,
            GameChangerService gameChangerService,
            DatabaseService databaseService,
            StatsOut statsOut,
            IMapper mapper)
        {
            _configuration = configuration; 
            _logger = logger;
            _gameChangerService = gameChangerService;
            _db = databaseService;
            _mapper = mapper;
            _statsOut = statsOut; 
        }

        public void Run()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("What would you like to do?");
                Console.WriteLine("1. Search Team");
                Console.WriteLine("2. Quit");
                int choice = 0;
                if (int.TryParse(Console.ReadLine(), out choice))
                {
                    switch (choice)
                    {
                        case 1:
                            // Search for a Team.
                            SearchTeam();
                            break;
                        case 2:
                            // Quit.
                            return;
                        default:
                            // Invalid choice.
                            Console.WriteLine("Invalid choice.");
                            break;
                    }
                }
            }
        }

        private void SearchTeam()
        {
            // Get the user's search text.
            Console.Clear();
            Console.WriteLine("Enter a Team name to search for: ");
            string query = Console.ReadLine() ?? string.Empty;
            int selection = 0;

            // Find all Teams that match the search text.
            var results = Task.Run(() => { return _gameChangerService.SearchTeamsAsync(query); }).Result;
            ;

            // Display the search results.
            if (results.hits.Count() == 0)
            {
                Console.WriteLine("No Teams found.");
            }
            else
            {
                var i = 1;
                foreach (var Team in results.hits)
                {
                    var location = Team.location == null ? "Unknown" : string.Format($"{Team.location.city}, {Team.location.state}");
                    Console.WriteLine("{0}. {1}", i++, Team.name);
                    Console.WriteLine($"\tId: {Team.id}");
                    Console.WriteLine($"\tSport/Season: {Team.sport.ToUpper()} / {Team.team_season.season.ToUpper()}, {Team.team_season.year} ");
                    Console.WriteLine($"\tNumber of Players: {Team.number_of_players}");
                    Console.WriteLine($"\tAge Group: {Team.age_group}");
                    Console.WriteLine($"\tLocation: {location}");
                    Console.WriteLine($"\tStaff: [ {string.Join(", ", Team.staff)} ]");
                }
            }
            Console.WriteLine("Which Team do you want to select?:");

            if (int.TryParse(Console.ReadLine(), out selection))
                SelectTeam(results.hits.ElementAt(selection - 1));

        }
        
        private void SelectTeam(SearchResults.SearchItem item)
        {
            int choice = 0;
            Console.Clear();
            Console.WriteLine("---------------------------------------------------------------------------\n");
            Console.WriteLine($"\tId: {item.id}");
            Console.WriteLine($"\tName: {item.name}");
            Console.WriteLine($"\tSport/Season: {item.sport.ToUpper()} / {item.team_season.season.ToUpper()}, {item.team_season.year} ");
            Console.WriteLine($"\tNumber of Players: {item.number_of_players}");
            Console.WriteLine($"\tAge Group: {item.age_group}");
            Console.WriteLine($"\tStaff: [ {string.Join(", ", item.staff)} ]\n");
            Console.WriteLine("---------------------------------------------------------------------------\n");
            Console.WriteLine("What would you like to do?\n");
            Console.WriteLine("1. Import Team Info?");
            Console.WriteLine("2. Back");

            if (int.TryParse(Console.ReadLine(), out choice))
            {
                switch (choice)
                {
                    case 1:
                        ImportTeamInfo(item).Wait();
                        return;
                    default:
                        // Invalid choice.
                        Console.WriteLine("Invalid choice.");
                        break;
                }
            }
        }
    

        private async Task ImportTeamInfo(SearchResults.SearchItem item) 
        {
            var team = await _gameChangerService.GetTeamAsync(item.id); 
            var teamPlayers = await  _gameChangerService.GetTeamSeasonStatsAsync(team.id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(team.id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(team.id);

            var teamTransform = new TeamTransform()
            {
                id = team.id,
                name = team.name,
                created_at = team.created_at,
                updated_at = team.updated_at,
                sport = team.sport,
                city = team.city,
                state = team.state,
                country = team.country,
                age_group = team.age_group,
                season_name = team.season_name,
                season_year = team.season_year,
                team_avatar_image = team.team_avatar_image,
                schedule = _mapper.Map<List<TeamTransform.TeamSchedule>>(teamSchedule.ToList()),
                completed_game_scores = _mapper.Map<List<TeamTransform.Game>>(scores),
            };
            

            foreach (var playerId in teamPlayers.stats_data.players.Keys)
            {
              var player = await _gameChangerService.GetPlayer(playerId);  
              teamTransform.players.Add(new TeamTransform.Player() 
              {
                id = player.id,
                first_name = player.first_name,
                last_name = player.last_name,
                number = player.number,
                status = player.status,
                team_id = player.team_id,
                person_id = player.person_id,
                batting_side = player.bats.batting_side,
                throwing_hand = player.bats.throwing_hand
              });
            }

            foreach(var evt in teamTransform.schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now)
                .Where(c => !c.@event.sub_type.Contains("scrimmages")))
            {
                var game = await _gameChangerService.GetTeamEventStatsAsync(team.id, evt.@event.id);
                var item1 = new TeamTransform.Event() 
                {
                    id = game.event_id,
                    boxscore = _mapper.Map<TeamTransform.Event.PlayerStats>(game.player_stats.stats)
                };
                item1.players = new Dictionary<string, TeamTransform.Event.PlayerStats>();

                foreach(var player in game.player_stats.players)
                {
                    item1.players.Add(player.Key, _mapper.Map<TeamTransform.Event.PlayerStats>(player.Value.stats));
                }

                teamTransform.completed_games.Add(item1);
            }

            await _db.CreateTeamAsync(teamTransform);


        }
    }
}
