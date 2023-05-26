using System.Text.Json.Serialization;

namespace Stats.Models
{
    /// <summary>
    /// Used to get a specific clip from the API endpoint. 
    /// Contains 'CloudFrontCookie' object.
    /// 
    /// Reference API Endpoint: "/teams/:teamID/video-clips/playable-clip/:clipID/clip"
    /// </summary>
    public class ClipAsset
    {
        public string url { get; set; } = string.Empty;
        public string player_clip_metadata_id { get; set; } = string.Empty;
        public CloudFrontCookie cookies { get; set; } = new CloudFrontCookie();
    }
}
