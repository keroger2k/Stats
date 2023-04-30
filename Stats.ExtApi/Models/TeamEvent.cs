using System.Text.Json.Serialization;

namespace Stats.ExtApi.Models
{
    /// <summary>
    /// Single Event:
    /// 
    /// stream_id:
    /// team_id:
    /// event_id:
    /// 
    /// cumulative_player_stats: Players season stat up to the point in time of the game.
    /// players_stats: Players stats for this game.
    /// spray_chart_data: Players plays for this game.
    /// </summary>
    public class TeamEvent
    {
        public string stream_id { get; set; } = null!;
        public string team_id { get; set; } = null!;
        public string event_id { get; set; } = null!;
        public StatsData player_stats { get; set; } = null!;
        //public SprayChart spray_chart_data { get; set; } = null!;
        public StatsData cumulative_player_stats { get; set; } = null!;
        /// <summary>
        /// Dictionary events are the playersId for the string, and the outcomes with
        /// the BallInPlayEvent.  
        /// </summary>
        public class SprayChart
        {
            public Dictionary<string, IEnumerable<BallInPlayEvent>> defense { get; set; } = null!;
            public Dictionary<string, IEnumerable<BallInPlayEvent>> offense { get; set; } = null!;      
            public class BallInPlayEvent
            {
                public string id { get; set; } = null!;
                public string code { get; set; } = null!;
                public DateTime createdAt { get; set; }
                public Attributes attributes { get; set; } = null!;
                public CompactorAttributes compactorAttributes { get; set; } = null!;
                public class CompactorAttributes
                {
                    public string stream { get; set; } = null!;  
                }
                public class Attributes
                {
                    public string playType { get; set; } = null!;
                    public List<Defender> defenders { get; set; } = null!;   
                    public string playResult { get; set; } = null!;  
                    public string hrLocation { get; set; } = null!;
                    public string playFlavor { get; set; } = null!;
                }
                public class Defender
                {
                    public bool error { get; set; }
                    public EventLocation location { get; set; } = null!;
                    public string position { get; set; } = null!;
                    public class EventLocation
                    {
                        public double x { get; set; }
                        public double y { get; set; }
                    }
                }
            }

        }
    }
}
