using Stats.ExtApi;
using System.Net.Http;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;
using static Stats.ExtApi.Models.TeamSchedule;

namespace Stats.CmdApp
{
    internal class Program
    {
        static void Main(string[] args)
        {

            string PONY_BLUE_13u_TEAM_ID = "c2fcadeb-cfc9-47f9-b8ac-3e0c17e37742";

            var client = new HttpClient();
            client.BaseAddress = new Uri("https://api.team-manager.gc.com");
            client.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6IjY1NGM1ZWQ3LTU5MDgtNGZlZC1iOWRhLWYwMjRhMmExNWJjNiIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6IjQ0Nzc4MDE2LWZiYmYtNDVlYy1iMjZhLTM0ODMyZGQ1NTJjYzo0ZmJmNjQxNC04MmM3LTQ2ZTktOGYxOC05MzVjMjYwZTA3MmMiLCJpYXQiOjE2ODIzNjYzMDgsImV4cCI6MTY4MjM2OTkwOH0.stWwyDKy2OyywtAlrgtoF5ahEdJy20-KcCt9KS9E0ZQ");

            try
            {
                //Console.WriteLine("\n-------------------  Search ---------------------------");
                //SearchTeams(client, "Pony Express 13u");
                //Console.WriteLine("\n-------------------  Players --------------------------");
                //ListPlayers(client, PONY_BLUE_13u_TEAM_ID);
                //Console.WriteLine("\n-------------------  Team Info ------------------------");
                //ShowTeam(client, PONY_BLUE_13u_TEAM_ID);
                //Console.WriteLine("\n-------------------  Team Avatar ----------------------");
                //ShowTeamAvatar(client, PONY_BLUE_13u_TEAM_ID);
                //Console.WriteLine("\n-------------------  Team Events ----------------------");
                //ListTeamEvents(client, PONY_BLUE_13u_TEAM_ID);
                //Console.WriteLine("\n-------------------  Team Events Info ----------------------");
                //GetEventData(client, PONY_BLUE_13u_TEAM_ID, "208a6e28-d2e8-49ed-a0bd-905a4e8ded41");
                //Console.WriteLine("\n-------------------  Team Events Info ----------------------");
                //GetTeamGameData(client, PONY_BLUE_13u_TEAM_ID);
                Console.WriteLine("\n-------------------  Team Season Stats ----------------------");
                GetTeamSeasonStats(client, PONY_BLUE_13u_TEAM_ID);

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
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        static void ShowTeamAvatar(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamAvatarAsync(Id); }).Result;
            Console.WriteLine(result.full_media_url);
        }

        static void ListTeamEvents(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamScheduledEventsAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result.Skip(17).Take(1), new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }
        static void GetEventData(HttpClient client, string Id, string eventId)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamEventStatsAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        static void GetTeamGameData(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamGameDataAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        static void GetTeamSeasonStats(HttpClient client, string Id)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamSeasonStatsAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }
    }
}