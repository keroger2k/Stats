﻿using MongoDB.Bson.Serialization.Attributes;
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
        public bool TeamNeedsUpdated(TeamTransform result)
        {
            // -3 hours is to eliminate returning a game in-progress
            var lastScheduledGame = result.schedule.LastOrDefault(c => c.@event.event_type == "game" && c.@event.status != "canceled" && c.@event.start.datetime != DateTime.MinValue && c.@event.end.datetime < DateTime.UtcNow.AddHours(-3));
            var lastCompletedGame = lastScheduledGame != null && result.completed_games.Any() && result.completed_games.Any(c => c.event_id == lastScheduledGame.@event.id);
            return !lastCompletedGame;
        }
        public async Task StoreImageFromUrlAsync(string id, string imageUrl)
        {
            if (!string.IsNullOrEmpty(imageUrl))
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

            for (var i = 0; i < 6; i++)
            {
                var pData = new Dictionary<string, int>();
                // -5 hours is crap; Should be based on team timezone offset from utc. Not sure how to do that.
                var games = interestingGames.Where(c => c.@event.start.datetime.AddHours(-5).Date == DateTime.Now.ToUniversalTime().AddDays(i * -1).Date);
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
