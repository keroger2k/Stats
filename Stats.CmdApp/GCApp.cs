using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.ExtApi.Models;
using Stats.ExtApi.Services;
using System.Formats.Asn1;
using System.Runtime.CompilerServices;
using System.Xml.Serialization;
using static Stats.ExtApi.Models.TeamEvent;

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
            Console.WriteLine("1. Show Team Info?");
            Console.WriteLine("2. Show Player Info?");
            Console.WriteLine("3. Import Team Info?");
            Console.WriteLine("4. Back");

            if (int.TryParse(Console.ReadLine(), out choice))
            {
                switch (choice)
                {
                    case 1:
                        // Search for a Team.
                        ListTeamInfo(item);
                        break;
                    case 2:
                        //ListTeamPlayer(item);
                        return;
                    case 3:
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
            var team = Task.Run(() => { return _gameChangerService.GetTeamAsync(item.id); }).Result;
            await AddTeamToDb(team);
            //await AddTeamPlayersToDb(team);
            //await AddTeamEventsToDb(team);
        }

        public async Task AddTeamToDb(Team team)
        {
            var teamDto = _mapper.Map<TeamDTO>(team);
            await _db.CreateTeamAsync(teamDto);
        }

        //public async Task AddTeamPlayersToDb(Team team)
        //{
        //    var teamPlayers = Task.Run(() => { return _gameChangerService.GetTeamSeasonStatsAsync(team.id); }).Result;

        //    foreach (var playerId in teamPlayers.stats_data.players.Keys)
        //    {
        //        var player = Task.Run(() => { return _gameChangerService.GetPlayer(playerId); }).Result;
        //        var playerDto = _mapper.Map<TeamPlayerDTO>(player);
        //        await _db.AddTeamPlayerAsync(playerDto);
        //    }
        //}
        //public async Task AddTeamEventsToDb(Team team)
        //{

        //    var teamSchedule = Task.Run(() => { return _gameChangerService.GetTeamScheduledEventsAsync(team.id); }).Result;
        //    var teamEvents = _mapper.Map<IEnumerable<TeamScheduleDTO>>(teamSchedule);
        //    await _db.AddTeamEventsAsync(teamEvents);

        //}





        private void ListTeamInfo(SearchResults.SearchItem item)
        {
            _statsOut.ShowTeam(item.id);
            //Console.WriteLine($"Adding {item.name} to database with id {item.id}");
            //var team = Task.Run(() => { return _gameChangerService.GetTeamAsync(item.id); }).Result;
            //var teamDto = _mapper.Map<TeamDTO>(team);
            //Task.Run(() => { return _db.CreateTeamAsync(teamDto); });
            //Console.WriteLine($"Done! Press any key to continue.");
            Console.ReadLine();
        }

        //private void ListTeamPlayer(SearchResults.SearchItem item)
        //{
        //    _statsOut.ListPlayers(item.id);

        //    Console.WriteLine($"Displaying {item.name} players");
        //    var team = Task.Run(() => { return _gameChangerService.GetTeamSeasonStatsAsync(item.id); }).Result;

        //    foreach(var playerId in team.stats_data.players.Keys)
        //    {
        //        var player = Task.Run(() => { return _gameChangerService.GetPlayer(playerId); }).Result;
        //        var playerDto = _mapper.Map<TeamPlayerDTO>(player);
        //        Task.Run(() => { return _db.AddTeamPlayerAsync(playerDto); });
        //        Console.WriteLine($"{player.id}: {player.first_name} {player.last_name}");
        //    }

        //    Console.WriteLine($"Done! Press any key to continue.");
        //    Console.ReadLine();
        //}
    }

}
