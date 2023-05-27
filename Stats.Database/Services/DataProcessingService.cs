using MongoDB.Bson.Serialization.Attributes;
using Stats.Database.Models;

namespace Stats.Database.Services
{
    public class AvatarImage
    {
        [BsonId]
        public string Id { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public byte[] ImageBytes { get; set; } 
    }
    public class DataProcessingService
    {
        private readonly DatabaseService _db;
        public DataProcessingService(DatabaseService db)
        {
            _db = db;
        }

        public async Task StoreImageFromUrlAsync(string id, string imageUrl)
        {
            try
            {
                using (var webClient = new HttpClient())
                {
                    byte[] imageBytes = await webClient.GetByteArrayAsync(imageUrl);
                    var imageBson = new AvatarImage
                    {
                        Id = id,
                        ImageBytes = imageBytes
                    };
                    await _db.CreateImageAsync(imageBson);
                }

            }
            catch (Exception)
            {

            }
            
        }
        public Dictionary<int, Dictionary<string, int>> GetTeamPitchSmart(TeamTransform team)
        {
            var interestingGames = team.schedule.Where(e => e.@event.event_type == "game")
                .Where(e => e.@event.start.datetime < DateTime.UtcNow && e.@event.start.datetime > DateTime.Today.AddDays(-5))
                .ToList();
            var result = new TeamTransform
            {
                id = team.id,
                name = team.name,
                players = team.players,
                schedule = interestingGames,
                completed_games = team.completed_games
                .Skip(team.completed_games.Count - interestingGames.Count)
                .Take(interestingGames.Count).ToList()
            };

            var data = new Dictionary<int, Dictionary<string, int>>();

            for (var i = 0; i < 5; i++)
            {
                var pData = new Dictionary<string, int>();
                var games = interestingGames.Where(c => c.@event.start.datetime.Date == DateTime.Now.ToUniversalTime().AddDays(i * -1).Date);
                foreach (var game in games)
                {
                    var gameData = result.completed_games.FirstOrDefault(c => c.event_id == game.@event.id);
                    if (gameData != null)
                    {
                        foreach (var player in gameData.player_stats.players)
                        {
                            if (player.Value.stats.defense != null)
                            {
                                if (pData.ContainsKey(player.Key))
                                {
                                    pData[player.Key] = pData[player.Key] + player.Value.stats.defense.P;

                                }
                                else 
                                {
                                    pData.Add(player.Key, player.Value.stats.defense.P);
                                }
                            }
                        }
                    }

                }
                data.Add(i, pData);
            }
            return data;
        }
    }
}
