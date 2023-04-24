using Stats.ExtApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Stats.ExtApi
{
    public class GameChangerService
    {
        private readonly HttpClient _httpClient;

        //# GC API Endpoints
        //private readonly string TEAM_SEASON_STATS = "/teams/{0}/season-stats";
        //private readonly string TEAM_GAME_DATA = "/teams/{0}/schedule/batch-simple-scorekeeping-data/";
        //private readonly string TEAM_GAME_STATS = "/teams/{0}/schedule/events/{1}/player-stats";
        //private readonly string TEAM_INFO = "/teams/{0}";
        //private readonly string TEAM_AVATAR = "/teams/{0}/avatar-image";
        //private readonly string TEAM_PLAYERS = "/teams/{0}/players";
        //private readonly string TEAM_SCHEDULE = "/teams/{0}/schedule/?fetch_place_details=true";

        /// <value>
        /// Property <c>SEARCH</c> API endpoint for seach functionality
        /// </value>
        /// <param><c>name</c> the search string</param>
        /// <param><c>sport</c> sport to search for; baseball, softball, etc..</param>
        /// <param><c>start_at</c>Sends back 25 results by default.</param>
        private readonly string SEARCH = "/search/team?name={0}&sport=baseball&start_at=0";
        
        //private readonly string GAME_RECAP_STORY = "/game-streams/gamestream-recap-story/{0}";
        //private readonly string GAME_RECAP_PAYLOAD = "/game-streams/gamestream-viewer-payload-lite/{0}?stream_id={1}";
        public GameChangerService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        //public async Task<IEnumerable<Game>> GetTeamGameDataAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_GAME_DATA, teamId);
        //    var result = JsonSerializer.Deserialize<IEnumerable<Game>>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<TeamAvatar> GetTeamAvatarAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_AVATAR, teamId);
        //    var result = JsonSerializer.Deserialize<TeamAvatar>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<TeamStatsRoot> GetTeamStatsAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_SEASON_STATS, teamId);
        //    var result = JsonSerializer.Deserialize<TeamStatsRoot>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<IEnumerable<TeamScheduledEvent>> GetTeamScheduledEventsAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_SCHEDULE, teamId);
        //    var result = JsonSerializer.Deserialize<IEnumerable<TeamScheduledEvent>>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<IEnumerable<PlayerInfoResults>> GetTeamPlayersAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_PLAYERS, teamId);
        //    var result = JsonSerializer.Deserialize<IEnumerable<PlayerInfoResults>>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<Team> GetTeamAsync(string teamId)
        //{
        //    var url = string.Format(TEAM_INFO, teamId);
        //    var result = JsonSerializer.Deserialize<Team>(await GetRequestAsync(url));
        //    return result;
        //}
        //public async Task<TeamEventStats> GetTeamEventStatsAsync(string teamId, string eventId)
        //{
        //    var url = string.Format(TEAM_GAME_STATS, teamId, eventId);
        //    var result = JsonSerializer.Deserialize<TeamEventStats>(await GetRequestAsync(url));
        //    return result;
        //}

        /// <summary> Will work with any valid GWT. Will display only your team data if not from IOS.</summary>
        /// <param name="query"></param>
        /// <returns>
        /// <param name="SearchResults"></param>
        /// </returns>
        public async Task<SearchResults> SearchTeamsAsync(string query)
        {
            var url = string.Format(SEARCH, query);
            var result = JsonSerializer.Deserialize<SearchResults>(await GetRequestAsync(url));
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
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }
    }
}
