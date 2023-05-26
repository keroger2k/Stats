namespace Stats.Models
{
    /// <summary>
    /// 
    /// Provides the cookie info for team videos.
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/schedule/events/:eventID/video-stream/assets/playback"
    /// 
    /// </summary>
    public class VideoPlayback
    {
        public string id { get; set; } = null!;
        public string schedule_event_id { get; set; } = null!;
        public CloudFrontCookie cookies { get; set; } = null!;
        public string url { get; set; } = null!;
    }
}
