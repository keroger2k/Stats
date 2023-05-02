using Stats.ExtApi.Services;
using System.Text.Json;

namespace Stats.CmdApp
{
    public class StatsOut 
    {
        private readonly GameChangerService _db;
        public StatsOut(GameChangerService db)
        {
            _db = db;
        }

        public async Task SearchTeams(string query)
        {
            var result = await _db.SearchTeamsAsync(query, "baseball");
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task ListTeamOpponents(string Id)
        {
            var result = await _db.GetTeamOpponentsAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task ListTeamUsers(string Id)
        {
            var result = await _db.GetTeamUsersAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task ListPlayers(string Id)
        {
            var result = await _db.GetTeamPlayersAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task ShowTeam(string Id)
        {
            var result = await _db.GetTeamAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task ShowTeamAvatar(string Id)
        {
            var result = await _db.GetTeamAvatarAsync(Id);
            Console.WriteLine(result.full_media_url);
        }

        public async Task ListTeamEvents(string Id)
        {
            var result = await _db.GetTeamScheduledEventsAsync(Id);
            string jsonString = JsonSerializer.Serialize(result.Skip(17).Take(1), new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }
        public async Task GetEventData(string Id, string eventId)
        {
            var result = await _db.GetTeamEventStatsAsync(Id, eventId);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task GetTeamGameData(string Id)
        {
            var result = await _db.GetTeamGameDataAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task GetTeamSeasonStats(string Id)
        {
            var result = await _db.GetTeamSeasonStatsAsync(Id);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task GetTeamEventVideoPlaybackData(string Id, string eventId)
        {
            var result = await _db.GetTeamEventVideoAssetsPlaybackAsync(Id, eventId);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task GetTeamEventVideoAssetsData(string Id, string eventId)
        {
            var result = await _db.GetTeamEventVideoAssetsAsync(Id, eventId);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

        public async Task GetTeamEventVideoStreamData(string Id, string eventId)
        {
            var result = await _db.GetTeamEventVideoStreamAsync(Id, eventId);
            string jsonString = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
            Console.WriteLine(jsonString);
        }

    }
}