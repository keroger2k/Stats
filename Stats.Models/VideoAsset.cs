namespace Stats.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/schedule/events/:eventID/video-stream/assets"
    /// Referenced API Endpoint: "/teams/:teamID/video-stream/assets"
    /// 
    /// </summary>
    public class VideoAsset
    {
        public string id { get; set; } = null!;
        public string stream_id { get; set; } = null!;
        public string team_id { get; set; } = null!;
        public string schedule_event_id { get; set; } = null!;
        public DateTime created_at { get; set; }
        public string audience_type { get; set; } = null!;
        public int duration { get; set; }
        public DateTime ended_at { get; set; }
        public string thumbnail_url { get; set; } = null!;
    }
}
