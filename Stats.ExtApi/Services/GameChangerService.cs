using Stats.ExtApi.Models;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;

namespace Stats.ExtApi.Services
{
    public class GameChangerService
    {
        private readonly HttpClient _httpClient;
        private readonly AuthorizationService _authorizationService;
        
         public GameChangerService(HttpClient httpClient, AuthorizationService authorizationService)
        {
            _httpClient = httpClient;
            _authorizationService = authorizationService;
        }
        
        public async Task<TeamPlayer> GetPlayer(string playerId)
        {
            var url = string.Format(APIEndpoint.PLAYER_INFO, playerId);
            var result = JsonSerializer.Deserialize<TeamPlayer>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<PlayerClip>> GetPlayerClipMeta(string teamId, string playerId)
        {
            var url = string.Format(APIEndpoint.PLAYER_CLIP_ASSETS, teamId, playerId);
            var result = JsonSerializer.Deserialize<IEnumerable<PlayerClip>>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<ClipAsset> GetPlayerClipCookie(string teamId, string clipId)
        {
            var url = string.Format(APIEndpoint.PLAYER_CLIP_COOKIES, teamId, clipId);
            var result = JsonSerializer.Deserialize<ClipAsset>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<TeamUsers>> GetTeamUsersAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_USERS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamUsers>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<Opponent>> GetTeamOpponentsAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_OPPONENTS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<Opponent>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<VideoStream> GetTeamEventVideoStreamAsync(string teamId, string eventId)
        {
            var url = string.Format(APIEndpoint.VIDEO_STREAM, teamId, eventId);
            var result = JsonSerializer.Deserialize<VideoStream>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<VideoAsset>> GetTeamEventVideoAssetsAsync(string teamId, string eventId)
        {
            var url = string.Format(APIEndpoint.EVENT_VIDEO_ASSETS, teamId, eventId);
            var result = JsonSerializer.Deserialize<IEnumerable<VideoAsset>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<VideoAsset>> GetTeamVideoAssetsAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_VIDEO_ASSETS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<VideoAsset>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideoAssetsPlaybackAsync(string teamId, string eventId)
        {
            var url = string.Format(APIEndpoint.VIDEO_ASSETS_PLAYBACK, teamId, eventId);
            var result = JsonSerializer.Deserialize<IEnumerable<VideoPlayback>>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Get the game_data for all the events on the schedule. 
        /// game_data will be null when the event is not a game or the games hasn't been played.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<Game>> GetTeamGameDataAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_GAME_DATA, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<Game>>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Gets the team avatar image.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<Avatar> GetTeamAvatarAsync(string teamId)
        {
            try
            {
                var url = string.Format(APIEndpoint.TEAM_AVATAR, teamId);
                var result = JsonSerializer.Deserialize<Avatar>(await GetRequestAsync(url));
                return result!;
            }
            catch (Exception)
            {
            }
            return new Avatar();
        }

        /// <summary>
        /// Gets the season stats for the team which takes into account all the games played up to this point.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<TeamSeasonStats> GetTeamSeasonStatsAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_SEASON_STATS, teamId);
            var result = JsonSerializer.Deserialize<TeamSeasonStats>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Gets a list of all scheduled events on the team calendar. This includes games, practices, etc..
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TeamSchedule>> GetTeamScheduledEventsAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_SCHEDULE, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamSchedule>>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Gets a list of all players on the team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<IEnumerable<TeamPlayer>> GetTeamPlayersAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_PLAYERS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamPlayer>>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Gets the basic information about the team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<Team> GetTeamAsync(string teamId)
        {
            var url = string.Format(APIEndpoint.TEAM_INFO, teamId);
            var t = await GetRequestAsync(url);
            var result = JsonSerializer.Deserialize<Team>(t);
            return result!;
        }

        /// <summary>
        /// Endpoing provides players cummulative stats up to the point of the event, games stats, and spray charts for the game.
        /// </summary>
        /// <param name="teamId">Teeam Id</param>
        /// <param name="eventId">Event Id</param>
        /// <returns></returns>
        public async Task<TeamEvent> GetTeamEventStatsAsync(string teamId, string eventId)
        {
            var url = string.Format(APIEndpoint.TEAM_GAME_STATS, teamId, eventId);
            var result = JsonSerializer.Deserialize<TeamEvent>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary> Will work with any valid JWT. Will display only your team data if not from IOS.</summary>
        /// <param name="query"></param>
        /// <returns>
        /// <param name="SearchResults"></param>
        /// </returns>
        public async Task<SearchResults> SearchTeamsAsync(string query, string city = "Bloomington", string state = "", string season = "", string year = "", string sport = "baseball")
        {
            StringBuilder st1 = new StringBuilder(); 
            if (!string.IsNullOrEmpty(city)) st1.Append($"&city={city}");
            if (!string.IsNullOrEmpty(state)) st1.Append($"&state={state}");
            if (!string.IsNullOrEmpty(season)) st1.Append($"&season={season}");
            if (!string.IsNullOrEmpty(year)) st1.Append($"&year={year}");
            if (!string.IsNullOrEmpty(sport)) st1.Append($"&sport={sport}");
            var url = string.Format(APIEndpoint.SEARCH, query, st1.ToString());
            var result = JsonSerializer.Deserialize<SearchResults>(await GetRequestAsync(url));
            return result!;
        }
        /// <summary>
        /// Private method used by all async Task to query the external API.
        /// </summary>
        /// <param name="url">API Endpoint</param>
        /// <returns>JSON results from external API</returns>
        private async Task<string> GetRequestAsync(string url)
        {
            _httpClient.DefaultRequestHeaders.Clear();
            var token = await _authorizationService.GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Add("gc-token", token);
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }

        public class SearchResults
        {
            public IEnumerable<SearchItem> hits { get; set; } = null!;

            public class SearchItem
            {
                public string id { get; set; } = string.Empty;
                public string name { get; set; } = string.Empty;
                public string sport { get; set; } = string.Empty;
                public SeasonInfo team_season { get; set; } = new SeasonInfo();
                public bool is_orphan { get; set; }
                public string competition_level { get; set; } = string.Empty;
                public string age_group { get; set; } = string.Empty;
                public int number_of_players { get; set; }
                public string[] staff { get; set; } = null!;
                public string avatar_url { get; set; } = string.Empty;
                public Place? location { get; set; }

                public class Place
                {
                    public string city { get; set; } = string.Empty;
                    public string country { get; set; } = string.Empty;
                    public string state { get; set; } = string.Empty;
                }
                public class SeasonInfo
                {
                    public string season { get; set; } = string.Empty;

                    public int year { get; set; }
                }
            }
        }
    }
}
