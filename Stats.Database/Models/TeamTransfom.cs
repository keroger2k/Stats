using MongoDB.Bson.Serialization.Attributes;
using Stats.Models;

namespace Stats.Database.Models
{
    public class TeamTransform
    {
        [BsonId]
        public string id { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public string sport { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string state { get; set; } = string.Empty;
        public string country { get; set; } = string.Empty;
        public string age_group { get; set; } = string.Empty;
        public string season_name { get; set; } = string.Empty;
        public int season_year { get; set; }
        public string team_avatar_image { get; set; } = string.Empty;
        public List<TeamPlayer> players { get; set; } = new List<TeamPlayer>();
        public List<TeamEvent> completed_games { get; set; } = new List<TeamEvent>();
        public List<Game> completed_game_scores { get; set; } = new List<Game>();
        public List<Opponent> opponents { get; set; } = new List<Opponent>();
        public List<Schedule> schedule { get; set; } = new List<Schedule>();
        public TeamSeasonStats season_stats { get; set; } = null!;
        public List<VideoAsset> video_assets { get; set; } = new List<VideoAsset>();
    }
}
