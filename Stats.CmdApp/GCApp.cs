using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stats.ExtApi.Models;
using System;
using Stats.Database.Services;
using AutoMapper;
using Stats.Database.Models;
using Stats.ExtApi.Services;

namespace Stats.CmdApp
{
    public  class GCApp
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger _logger;
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly IMapper _mapper;

        public GCApp(ILogger<GCApp> logger, IConfiguration configuration, 
            GameChangerService gameChangerService, 
            DatabaseService databaseService,
            IMapper mapper)
        {
            _configuration = configuration; 
            _logger = logger;
            _gameChangerService = gameChangerService;
            _db = databaseService;
            _mapper = mapper;
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
            Console.WriteLine("1. Add Team to DB?");
            Console.WriteLine("2. Back");

            if (int.TryParse(Console.ReadLine(), out choice))
            {
                switch (choice)
                {
                    case 1:
                        // Search for a Team.
                        AddTeamToDb(item);
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
    
        private void AddTeamToDb(SearchResults.SearchItem item)
        {
            Console.WriteLine($"Adding {item.name} to database with id {item.id}");
            var team = Task.Run(() => { return _gameChangerService.GetTeamAsync(item.id); }).Result;
            var teamDto = _mapper.Map<TeamDTO>(team);
            Task.Run(() => { return _db.CreateAsync(teamDto); });
            Console.WriteLine($"Done! Press any key to continue.");
            Console.ReadLine();
        }
    }

}
