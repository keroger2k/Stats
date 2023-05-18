using MongoDB.Bson.Serialization.Attributes;
using Stats.Database.Models;
using System.Text.Json.Serialization;

namespace Stats.API.Models
{
    public class TeamSchedule
    { 
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
        public IEnumerable<Schedule> schedule { get; set; } = new List<Schedule>();
        public IEnumerable<Game> completed_game_scores { get; set; } = new List<Game>();
        public IEnumerable<Opponent> opponents { get; set; } = new List<Opponent>();
        public class Schedule
        {
            public Event @event { get; set; } = null!;
            public class Event
            {
                public string id { get; set; } = null!;
                public string event_type { get; set; } = null!;
                public IEnumerable<string> sub_type { get; set; } = null!;
                public string status { get; set; } = null!;
                public bool full_day { get; set; }
                public string team_id { get; set; } = null!;
                public Start start { get; set; } = null!;
                public End end { get; set; } = null!;
                public Arrive arrive { get; set; } = null!;
                public Location location { get; set; } = null!;
                public string timezone { get; set; } = null!;
                public string notes { get; set; } = null!;
                public string title { get; set; } = null!;
                public string series_id { get; set; } = null!;
                public class Start
                {
                    public DateTime datetime { get; set; }
                }
                public class End
                {
                    public DateTime datetime { get; set; }
                }
                public class Arrive
                {
                    public DateTime datetime { get; set; }
                }
                public class Location
                {
                    public Coordinates coordinates { get; set; } = null!;
                    public string[] address { get; set; } = null!;
                    public class Coordinates
                    {
                        public double latitude { get; set; }
                        public double longitude { get; set; }
                    }
                }
            }
            public PregameData pregame_data { get; set; } = null!;
            public class PregameData
            {
                public string id { get; set; } = string.Empty!;
                public string game_id { get; set; } = null!;
                public string home_away { get; set; } = null!;
                public string lineup_id { get; set; } = null!;
                public string opponent_id { get; set; } = null!;
                public string opponent_name { get; set; } = null!;
                public string meta_seq { get; set; } = null!;
                public DateTime created_at { get; set; }
                public DateTime updated_at { get; set; }
                public Opponent opponent { get; set; } = null!;
                public class Opponent
                {
                    public string root_team_id { get; set; } = null!;
                    public string owning_team_id { get; set; } = null!;
                    public string progenitor_team_id { get; set; } = null!;
                    public string meta_seq { get; set; } = null!;
                    public DateTime created_at { get; set; }
                    public DateTime updated_at { get; set; }
                    public RootTeam rootTeam { get; set; } = null!;
                    public class RootTeam
                    {
                        public string id { get; set; } = null!;
                        public string name { get; set; } = null!;
                        public string team_type { get; set; } = null!;
                        public int meta_seq { get; set; }
                        public DateTime created_at { get; set; }
                        public DateTime updated_at { get; set; }
                    }
                }
            }
        }
        public class Game
        {
            [BsonId]
            public string event_id { get; set; } = null!;
            public GameData game_data { get; set; } = null!;
            public class GameData
            {
                [BsonId]
                public string game_id { get; set; } = null!;
                public string scorekeeping_config_id { get; set; } = null!;
                public string game_state { get; set; } = null!;
                public int team_score { get; set; }
                public int opponent_score { get; set; }
                public DateTime last_time_to_score_ts { get; set; }
            }
        }
    }
}
