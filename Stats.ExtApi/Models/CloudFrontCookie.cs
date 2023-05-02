using System.Text.Json.Serialization;

namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Reference API Endpoint: "/teams/:teamID/video-clips/playable-clip/:clipID/clip"
    /// Reference API Endpoint: "/teams/:teamID/schedule/events/:eventID/video-stream/assets/playback"
    /// 
    /// </summary>
    public class CloudFrontCookie
    {
        [JsonPropertyName("CloudFront-Key-Pair-Id")]
        public string CloudFrontKeyPairId { get; set; } = null!;
        [JsonPropertyName("CloudFront-Signature")]
        public string CloudFrontSignature { get; set; } = null!;
        [JsonPropertyName("CloudFront-Policy")]
        public string CloudFrontPolicy { get; set; } = null!;
    }
}
