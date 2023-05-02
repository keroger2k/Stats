using System.Text.Json.Serialization;

namespace Stats.ExtApi.Models
{
    public  class ClipCookie
    {
        public string url { get; set; } = string.Empty;
        public string player_clip_metadata_id { get; set; } = string.Empty;
        public Cookie cookies { get; set; } = new Cookie();

        public class Cookie
        {
            [JsonPropertyName("CloudFront-Key-Pair-Id")]
            public string CloudFrontKeyPairId { get; set; } = string.Empty;
            [JsonPropertyName("CloudFront-Signature")]
            public string CloudFrontSignature { get; set; } = string.Empty;
            [JsonPropertyName("CloudFront-Policy")]
            public string CloudFrontPolicy { get; set; } = string.Empty;

        }
    }
}
