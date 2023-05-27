using Stats.Models;

namespace Stats.API.Models
{
    public class OpenOpponentVideos
    {
        public List<OpenOpponentVideo> videos { get; set; } = new List<OpenOpponentVideo>();
    }

    public class OpenOpponentVideo
    {
        public string Url { get; set; } = string.Empty;
        public VideoAsset Asset { get; set; } = new VideoAsset();
        public CloudFrontCookie CloudFrontCookie { get; set; } = new CloudFrontCookie();
    }
}
