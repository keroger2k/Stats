namespace Stats.ExtApi.Models
{
    public class Game
    {
        public string event_id { get; set; } = null!;
        public GameData game_data { get; set; } = null!;
        public class GameData
        {
            public string game_id { get; set; } = null!;
            public object scorekeeping_config_id { get; set; } = null!;
            public string game_state { get; set; } = null!;
            public int team_score { get; set; }
            public int opponent_score { get; set; }
            public DateTime last_time_to_score_ts { get; set; }
        }
    }
}
