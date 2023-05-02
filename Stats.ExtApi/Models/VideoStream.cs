namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/schedule/events/:eventID/video-stream"
    /// 
    /// </summary>
    public class VideoStream
    {
        public string stream_id { get; set; } = null!;
        public string schedule_event_id { get; set; } = null!;
        public bool disabled { get; set; } 
        public bool is_muted { get; set; }
        public string team_id { get; set; } = null!;
        public string user_id { get; set; } = null!;
        public int viewer_count { get; set; }
        public string audience_type { get; set; } = null!;
        public bool is_playable { get; set; }
        public string thumbnail_url { get; set; } = null!;
        public string playable_at { get; set; } = null!;
        public string live_at { get; set; } = null!;
        public string publish_url { get; set; } = null!;
        public string person_id { get; set; } = null!;
    }
}
