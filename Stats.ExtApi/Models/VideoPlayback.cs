using System.Text.Json.Serialization;

namespace Stats.ExtApi.Models
{
    public class VideoPlayback
    {
        public string id { get; set; } = null!;
        public string schedule_event_id { get; set; } = null!;
        public CloudFrontCookie cookies { get; set; } = null!;
        public string url { get; set; } = null!;

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
}
