using Stats.Database.Models;

namespace Stats.Database.Services
{
    public class DataProcessingService
    {
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
                                else if (result.players.Any(c => c.id == player.Key))
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
