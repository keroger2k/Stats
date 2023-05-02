namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/season-stats"
    /// 
    /// </summary>
    public class TeamSeasonStats
    {
        public string id { get; set; } = null!;
        public StatsData stats_data { get; set; } = null!;
        public string team_id { get; set; } = null!;
        public string meta_seq { get; set; } = null!;
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
