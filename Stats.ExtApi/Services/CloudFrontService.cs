using Stats.Models;
using System.Net;
using System.Text;
using System.Text.Json;

namespace Stats.ExtApi.Services
{
    public class CloudFrontService
    {
        private readonly HttpClient _httpClient;

        public CloudFrontService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetPlayListUrl(VideoPlayback masterM3U8)
        {
            var url = String.Format($"{masterM3U8.url}?Key-Pair-Id={masterM3U8.cookies.CloudFrontKeyPairId}&Signature={masterM3U8.cookies.CloudFrontSignature}&Policy={masterM3U8.cookies.CloudFrontPolicy}");
            var result = await GetRequestAsync(url);
            return result;
        }

        public async Task<string> GetPlayListFile(VideoPlayback masterM3U8, string url)
        {
            var url1 = String.Format($"{url}?Key-Pair-Id={masterM3U8.cookies.CloudFrontKeyPairId}&Signature={masterM3U8.cookies.CloudFrontSignature}&Policy={masterM3U8.cookies.CloudFrontPolicy}");
            var result = await GetRequestAsync(url1);
            return result;
        }

        /// <summary>
        /// Private method used by all async Task to query the external API.
        /// </summary>
        /// <param name="url">API Endpoint</param>
        /// <returns>JSON results from external API</returns>
        private async Task<string> GetRequestAsync(string url)
        {
            var response = await _httpClient.GetAsync(url);
            return await response.Content.ReadAsStringAsync();
        }
    }
}
