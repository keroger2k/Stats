namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/video-clips/player/:playerID/clips"
    /// 
    /// </summary>
    public class PlayerClip
    {
        public string clip_metadata_id { get; set; } = string.Empty;
        public string audience_type { get; set; } = string.Empty;
        public string play_type { get; set; } = string.Empty;
        public string last_edited_by { get; set; } = string.Empty;
        public string last_updated_at { get; set; } = string.Empty;
        public string event_id { get; set; } = string.Empty;
        public string team_id { get; set; } = string.Empty;
        public string player_id { get; set; } = string.Empty;
        public string player_role { get; set; } = string.Empty;
        public string perspective { get; set; } = string.Empty;
        public string sport { get; set; } = string.Empty;
        public double duration { get; set; }
        public string thumbnail_url { get; set; } = string.Empty;
        public string stream_id { get; set; } = string.Empty;
        public string timestamp { get; set; } = string.Empty;
        public string period { get; set; } = string.Empty;
        public string own_team_score { get; set; } = string.Empty;
        public string opponent_team_score { get; set; } = string.Empty;
    }
}
