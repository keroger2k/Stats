using Stats.ExtApi;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;
using static Stats.ExtApi.Models.TeamSchedule;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Stats.CmdApp
{
    public class Program
    {
        static void Main(string[] args)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.team-manager.gc.com");
            client.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6IjY1NGM1ZWQ3LTU5MDgtNGZlZC1iOWRhLWYwMjRhMmExNWJjNiIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6ImY2Njk3NDEyLWVjMjgtNGIxYi04ZTE1LTkxOWI5YzhjZDJkYzpiZWJmMmQ1ZC0yMDMxLTRiZjktYTQxZC03YWUwZDFkOGVkY2QiLCJpYXQiOjE2ODI0MTk0MDAsImV4cCI6MTY4MjQyMzAwMH0.zCYGBGoV4gn0RT_dUrWg5rwwD-TrLes9AbvVGjex9AE");
            var gc = new GameChangerService(client);
            var stats = new StatsOut(gc);

            while (true)
            {
                Console.WriteLine("What would you like to do?");
                Console.WriteLine("1. Search Team");
                Console.WriteLine("2. Add Team");
                Console.WriteLine("3. Quit");

                // Get the user's input.
                int choice = int.Parse(Console.ReadLine() ?? "3");

                // Switch on the user's choice.
                switch (choice)
                {
                    case 1:
                        // Search for a team.
                        SearchTeam(gc);
                        break;
                    case 2:
                        // Add a team.
                        //AddTeam(teams);
                        break;
                    case 3:
                        // Quit.
                        return;
                    default:
                        // Invalid choice.
                        Console.WriteLine("Invalid choice.");
                        break;
                }
            }
        }

        private static void SearchTeam(GameChangerService gc)
        {
            // Get the user's search text.
            Console.WriteLine("Enter a team name to search for: ");
            string query = Console.ReadLine() ?? string.Empty;

            // Find all teams that match the search text.
            var results = Task.Run(() => { return gc.SearchTeamsAsync(query); }).Result;
;

            // Display the search results.
            if (results.hits.Count() == 0)
            {
                Console.WriteLine("No teams found.");
            } 
            else
            {
                foreach(var team in results.hits) 
                {
                    Console.WriteLine($"id: { team.id }, Name: { team.name }, Location: { team.location.city }, { team.location.state }, Staff: [ { string.Join(",", team.staff) } ]");
                }
            }
        }

    }
}       