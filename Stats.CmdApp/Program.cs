using Stats.ExtApi;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Stats.CmdApp
{
    internal class Program
    {
        static void Main(string[] args)
        {

            string PONY_BLUE_13u_TEAM_ID = "c2fcadeb-cfc9-47f9-b8ac-3e0c17e37742";
            string PONY_GRAY_13u_TEAM_ID = "68f03196-5b1d-4a09-b0ea-e4140664b29d";

            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.team-manager.gc.com");
            client.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6IjY1NGM1ZWQ3LTU5MDgtNGZlZC1iOWRhLWYwMjRhMmExNWJjNiIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6IjQ0Nzc4MDE2LWZiYmYtNDVlYy1iMjZhLTM0ODMyZGQ1NTJjYzo1ZWYzNjc2Yy05MWIxLTRjMDMtYWU4My1iMmFhODAxMmRhNjgiLCJpYXQiOjE2ODIzNTczMDYsImV4cCI6MTY4MjM2MDkwNn0.tHjzuuiZ55xm9N_Y4_xCo50IaDPvULwwWosOWUHL17Y");

            try
            {
                Console.WriteLine("\n-------------------  Search ---------------------------");
                SearchTeams(client, "Pony Express 13u");
                Console.WriteLine("\n-------------------  Players --------------------------");
                ListPlayers(client, PONY_BLUE_13u_TEAM_ID);
                Console.WriteLine("\n-------------------  Team Info ------------------------");
                ShowTeam(client, PONY_BLUE_13u_TEAM_ID);
                Console.WriteLine("\n-------------------  Team Avatar ----------------------");
                ShowTeamAvatar(client, PONY_BLUE_13u_TEAM_ID);
            }
            catch (AggregateException e)
            {
                if (e.InnerException is HttpRequestException &&
                    ((HttpRequestException)e.InnerException).StatusCode is System.Net.HttpStatusCode.Unauthorized)
                {
                    Console.WriteLine($"Not Authorized!");
                }
            }
            catch (Exception)
            {
                throw;
            }


        }

        static void SearchTeams(HttpClient client, string query)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.SearchTeamsAsync(query); }).Result;
            foreach (var team in result.hits)
            {
                Console.WriteLine($"Id: {team.id}, Name: {team.name}, Location: {team.location.city}, {team.location.state}");
            }

        }

        static void ListPlayers(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamPlayersAsync(Id); }).Result;
            foreach (var player in result)
            {
                Console.WriteLine($"Id: {player.id}, First: {player.first_name}, Last: {player.last_name}");
            }
        }

        static void ShowTeam(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result);
            Console.WriteLine(jsonString);
        }

        static void ShowTeamAvatar(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamAvatarAsync(Id); }).Result;
            Console.WriteLine(result.full_media_url);
        }
    }
}