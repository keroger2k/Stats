using Stats.ExtApi;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Stats.CmdApp
{
    public class StatsOut 
    {
        private readonly GameChangerService _db;
        public StatsOut(GameChangerService db)
        {
            _db = db;
        }

        public void SearchTeams(string query)
        {
            var result = Task.Run(() => { return _db.SearchTeamsAsync(query); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void ListTeamOpponents(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamOpponentsAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void ListTeamUsers(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamUsersAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void ListPlayers(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamPlayersAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void ShowTeam(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void ShowTeamAvatar(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamAvatarAsync(Id); }).Result;
            Console.WriteLine(result.full_media_url);
        }

        public void ListTeamEvents(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamScheduledEventsAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result.Skip(17).Take(1), new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }
        public void GetEventData(string Id, string eventId)
        {
            var result = Task.Run(() => { return _db.GetTeamEventStatsAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void GetTeamGameData(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamGameDataAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void GetTeamSeasonStats(string Id)
        {
            var result = Task.Run(() => { return _db.GetTeamSeasonStatsAsync(Id); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void GetTeamEventVideoPlaybackData(string Id, string eventId)
        {
            var result = Task.Run(() => { return _db.GetTeamEventVideoAssetsPlaybackAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void GetTeamEventVideoAssetsData(string Id, string eventId)
        {
            var result = Task.Run(() => { return _db.GetTeamEventVideoAssetsAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public void GetTeamEventVideoStreamData(string Id, string eventId)
        {
            var result = Task.Run(() => { return _db.GetTeamEventVideoStreamAsync(Id, eventId); }).Result;
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

    }
}