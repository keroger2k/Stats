using MongoDB.Bson.Serialization.Attributes;
using Stats.Database.Models;
using System.Text.Json.Serialization;

namespace Stats.API.Models
{
    public class TeamPlayers
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
        public List<Player> players { get; set; } = new List<Player>();
        public class Player
        {
            public string id { get; set; } = null!;
            public string first_name { get; set; } = null!;
            public string last_name { get; set; } = null!;
            public string number { get; set; } = null!;
            public string status { get; set; } = null!;
            public string team_id { get; set; } = null!;
            public string person_id { get; set; } = null!;
            public string batting_side { get; set; } = null!;
            public string throwing_hand { get; set; } = null!;
        }
    }
}
