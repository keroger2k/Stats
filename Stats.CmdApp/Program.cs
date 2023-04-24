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
            client.DefaultRequestHeaders.Add("gc-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijk2MWM1YmM1LWJkM2EtNDg4MS1iMmI0LTgyM2YzOGM0YzBiYyJ9.eyJ0eXBlIjoidXNlciIsImNpZCI6ImNkNGFlMjFjLWYyY2MtNDIwNi04NzQ1LTkwNDI0YWQ1NjE4YyIsImVtYWlsIjoia3lsZS5yb2dlcnNAZ21haWwuY29tIiwidXNlcklkIjoiMzZiZTgwYWMtY2UwZC00OTE4LTgzMDYtY2M2MjMzOTZlMmMyIiwicnRrbiI6ImQ3NWVkNTE5LTVjZGQtNDRkNy05MTZhLWQxYmJlNzM0OWU2Mzo1MDgwN2Y3Zi05Zjk1LTQyMzYtYTEwZS00NzFmN2NiYjg5N2QiLCJpYXQiOjE2ODIzMzk3OTQsImV4cCI6MTY4MjM4Mjk5NH0._NcAHYL4bv8AlNkgZb_28Ia7474dxntW1zEhTNd4hpU");

            try
            {
                //Console.WriteLine("\n-------------------  Search ---------------------------");
                //SearchTeams(client, "Pony Express 13u");
                //Console.WriteLine("\n-------------------  Players --------------------------");
                ListPlayers(client, PONY_BLUE_13u_TEAM_ID);
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
                //Console.WriteLine("\n-------------------  Team Season Stats ----------------------");
                //GetTeamSeasonStats(client, PONY_BLUE_13u_TEAM_ID);
                //Console.WriteLine("\n-------------------  Team Event Video Playback Data ----------------------");
                //GetTeamEventVideoPlaybackData(client, PONY_BLUE_13u_TEAM_ID, "f6a025d8-8f0c-467d-9d79-4afb0dc3554c");
                //Console.WriteLine("\n-------------------  Team Event Video Asset Data ----------------------");
                //GetTeamEventVideoAssetsData(client, PONY_BLUE_13u_TEAM_ID, "f6a025d8-8f0c-467d-9d79-4afb0dc3554c");
                //Console.WriteLine("\n-------------------  Team Event Video Stream Data ----------------------");
                //GetTeamEventVideoStreamData(client, PONY_BLUE_13u_TEAM_ID, "f6a025d8-8f0c-467d-9d79-4afb0dc3554c");
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

        static void GetTeamEventVideoPlaybackData(HttpClient client, string Id, string eventId)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamEventVideoAssetsPlaybackAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        static void GetTeamEventVideoAssetsData(HttpClient client, string Id, string eventId)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamEventVideoAssetsAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        static void GetTeamEventVideoStreamData(HttpClient client, string Id, string eventId)
        {
            var db = new GameChangerService(client);
            var result = Task.Run(() => { return db.GetTeamEventVideoStreamAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }
    }
}