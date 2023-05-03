using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Stats.API.Models
{
    public class Team 
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
    }
}
