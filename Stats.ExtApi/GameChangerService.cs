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
        private readonly string TEAM_SEASON_STATS = "/teams/{0}/season-stats";
        private readonly string TEAM_GAME_DATA = "/teams/{0}/schedule/batch-simple-scorekeeping-data/";
        private readonly string TEAM_GAME_STATS = "/teams/{0}/schedule/events/{1}/player-stats";
        private readonly string TEAM_INFO = "/teams/{0}";
        private readonly string TEAM_AVATAR = "/teams/{0}/avatar-image";
        private readonly string TEAM_PLAYERS = "/teams/{0}/players";
        private readonly string TEAM_SCHEDULE = "/teams/{0}/schedule/?fetch_place_details=true";
        private readonly string SEARCH = "/search/team?name={0}&sport=baseball&start_at=0";
        
        //private readonly string GAME_RECAP_STORY = "/game-streams/gamestream-recap-story/{0}";
        //private readonly string GAME_RECAP_PAYLOAD = "/game-streams/gamestream-viewer-payload-lite/{0}?stream_id={1}";
        public GameChangerService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        /// <summary>
        /// Get the game_data for all the events on the schedule. 
        /// game_data will be null when the event is not a game or the games hasn't been played.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Game>> GetTeamGameDataAsync(string teamId)
        {
            var url = string.Format(TEAM_GAME_DATA, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<Game>>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Gets the team avatar image.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<TeamAvatar> GetTeamAvatarAsync(string teamId)
        {
            var url = string.Format(TEAM_AVATAR, teamId);
            var result = JsonSerializer.Deserialize<TeamAvatar>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Gets the season stats for the team which takes into account all the games played up to this point.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<TeamSeasonStats> GetTeamSeasonStatsAsync(string teamId)
        {
            var url = string.Format(TEAM_SEASON_STATS, teamId);
            var result = JsonSerializer.Deserialize<TeamSeasonStats>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Gets a list of all scheduled events on the team calendar. This includes games, practices, etc..
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TeamSchedule>> GetTeamScheduledEventsAsync(string teamId)
        {
            var url = string.Format(TEAM_SCHEDULE, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamSchedule>>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Gets a list of all players on the team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TeamPlayer>> GetTeamPlayersAsync(string teamId)
        {
            var url = string.Format(TEAM_PLAYERS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamPlayer>>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Gets the basic information about the team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<Team> GetTeamAsync(string teamId)
        {
            var url = string.Format(TEAM_INFO, teamId);
            var result = JsonSerializer.Deserialize<Team>(await GetRequestAsync(url));
            return result;
        }

        /// <summary>
        /// Endpoing provides players cummulative stats up to the point of the event, games stats, and spray charts for the game.
        /// </summary>
        /// <param name="teamId">Teeam Id</param>
        /// <param name="eventId">Event Id</param>
        /// <returns></returns>
        public async Task<TeamEvent> GetTeamEventStatsAsync(string teamId, string eventId)
        {
            var url = string.Format(TEAM_GAME_STATS, teamId, eventId);
            var result = JsonSerializer.Deserialize<TeamEvent>(await GetRequestAsync(url));
            return result;
        }

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
