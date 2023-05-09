using Microsoft.Extensions.Caching.Memory;
using Stats.ExtApi.Models;
using System;
using System.Net;
using System.Text.Json;
using static System.Net.WebRequestMethods;

namespace Stats.ExtApi.Services
{
    public class GameChangerService
    {
        private readonly HttpClient _httpClient;
        private readonly AuthorizationService _authService;
        private readonly IMemoryCache _memoryCache;
        //When you complete and /auth an refresh token is included. This is used for the 
        //authorization refresh request. This will change every time successful authorization
        //occurs. Will need to be stored and refreshed as needed.
        private const string REFRESH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNhYzg2NmZkLWMyNzMtNGZjZi04NTU0LTc3ZThmYjYzZTc2MiJ9.eyJpZCI6IjBjNjZhYzcxLTY2YTEtNGFiMy04MTIzLTVjNDFmMDY4YTdmNDplNDViZTdmZC04NTdmLTQ4ZTgtYTIzZS0yYmU1ZGM5MWQ4ZjAiLCJjaWQiOiJmN2UyZGNlNy04Mzk1LTRkMWYtYmFjZS04ODEwYjI2YzBlOGUiLCJ1aWQiOiIzNmJlODBhYy1jZTBkLTQ5MTgtODMwNi1jYzYyMzM5NmUyYzIiLCJlbWFpbCI6Imt5bGUucm9nZXJzQGdtYWlsLmNvbSIsImlhdCI6MTY4MzIxODgxMiwiZXhwIjoxNjg0NDI4NDEyfQ.aLZXQibm_v36ut5juFLqBgfyKTfY4ZZXBd_M7HnyZck";


        //# GC API Endpoints
        //Works with JWT token from website or IOS
        private readonly string TEAM_SEASON_STATS = "/teams/{0}/season-stats";
        //Works with JWT token from website or IOS
        private readonly string PLAYER_INFO = "/players/{0}";
        //Works with JWT token from website or IOS
        private readonly string TEAM_GAME_DATA = "/teams/{0}/schedule/batch-simple-scorekeeping-data/";
        //Works with JWT token from website or IOS
        private readonly string TEAM_GAME_STATS = "/teams/{0}/schedule/events/{1}/player-stats";
        //Works with JWT token from website or IOS
        private readonly string TEAM_INFO = "/teams/{0}";
        //Works with JWT token from website or IOS
        private readonly string TEAM_AVATAR = "/teams/{0}/avatar-image";
        //Works with JWT token from website or IOS
        private readonly string TEAM_SCHEDULE = "/teams/{0}/schedule/?fetch_place_details=true";
        //Works with JWT token from website or IOS
        private readonly string SEARCH = "/search/team?name={0}&sport={1}&start_at=0";
        //Works with JWT token from website or IOS
        private readonly string TEAM_VIDEO_ASSETS = "/teams/{0}/video-stream/assets";
        //Works with JWT token from website or IOS
        private readonly string PLAYER_CLIP_ASSETS = "/teams/{0}/video-clips/player/{1}/clips";
        //Works with JWT token from website or IOS
        private readonly string PLAYER_CLIP_COOKIES = "/teams/{0}/video-clips/playable-clip/{1}/clip";
        //Works with JWT token from website or IOS
        private readonly string EVENT_VIDEO_ASSETS = "/teams/{0}/schedule/events/{1}/video-stream/assets";
        //Works with JWT token from website or IOS
        private readonly string VIDEO_STREAM = "/teams/{0}/schedule/events/{1}/video-stream";
        //Works with JWT token from website or IOS
        private readonly string TEAM_USERS = "/teams/{0}/users";
        //Works with JWT token from website or IOS
        private readonly string TEAM_OPPONENTS = "/teams/{0}/opponents";

        /**************  ONLY works with IOS JWT.  ******************/
        private readonly string TEAM_PLAYERS = "/teams/{0}/players";
        /**************  ONLY works when they allow?  ******************/
        private readonly string VIDEO_ASSETS_PLAYBACK = "/teams/{0}/schedule/events/{1}/video-stream/assets/playback";

        //private readonly string GAME_RECAP_STORY = "/game-streams/gamestream-recap-story/{0}";
        //private readonly string GAME_RECAP_PAYLOAD = "/game-streams/gamestream-viewer-payload-lite/{0}?stream_id={1}";
        public GameChangerService(HttpClient httpClient, AuthorizationService authService, IMemoryCache memoryCache)
        {
            _httpClient = httpClient;
            _authService = authService;
            _memoryCache = memoryCache;
        }

        public async Task<TeamPlayer> GetPlayer(string playerId)
        {
            var url = string.Format(PLAYER_INFO, playerId);
            var result = JsonSerializer.Deserialize<TeamPlayer>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<PlayerClip>> GetPlayerClipMeta(string teamId, string playerId)
        {
            var url = string.Format(PLAYER_CLIP_ASSETS, teamId, playerId);
            var result = JsonSerializer.Deserialize<IEnumerable<PlayerClip>>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<ClipAsset> GetPlayerClipCookie(string teamId, string clipId)
        {
            var url = string.Format(PLAYER_CLIP_COOKIES, teamId, clipId);
            var result = JsonSerializer.Deserialize<ClipAsset>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<TeamUsers>> GetTeamUsersAsync(string teamId)
        {
            var url = string.Format(TEAM_USERS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamUsers>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<TeamOpponents>> GetTeamOpponentsAsync(string teamId)
        {
            var url = string.Format(TEAM_OPPONENTS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<TeamOpponents>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<VideoStream> GetTeamEventVideoStreamAsync(string teamId, string eventId)
        {
            var url = string.Format(VIDEO_STREAM, teamId, eventId);
            var result = JsonSerializer.Deserialize<VideoStream>(await GetRequestAsync(url));
            return result!;
        }
        public async Task<IEnumerable<VideoAsset>> GetTeamEventVideoAssetsAsync(string teamId, string eventId)
        {
            var url = string.Format(EVENT_VIDEO_ASSETS, teamId, eventId);
            var result = JsonSerializer.Deserialize<IEnumerable<VideoAsset>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<VideoAsset>> GetTeamVideoAssetsAsync(string teamId)
        {
            var url = string.Format(TEAM_VIDEO_ASSETS, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<VideoAsset>>(await GetRequestAsync(url));
            return result!;
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideoAssetsPlaybackAsync(string teamId, string eventId)
        {
            var url = string.Format(VIDEO_ASSETS_PLAYBACK, teamId, eventId);
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
            var url = string.Format(TEAM_GAME_DATA, teamId);
            var result = JsonSerializer.Deserialize<IEnumerable<Game>>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary>
        /// Gets the team avatar image.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<TeamAvatar> GetTeamAvatarAsync(string teamId)
        {
            try
            {
                var url = string.Format(TEAM_AVATAR, teamId);
                var result = JsonSerializer.Deserialize<TeamAvatar>(await GetRequestAsync(url));
                return result!;
            }
            catch (Exception)
            {
            }
            return new TeamAvatar();
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
            return result!;
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
            return result!;
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
            return result!;
        }

        /// <summary>
        /// Gets the basic information about the team.
        /// </summary>
        /// <param name="teamId"></param>
        /// <returns></returns>
        public async Task<Team> GetTeamAsync(string teamId)
        {
            var url = string.Format(TEAM_INFO, teamId);
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
            var url = string.Format(TEAM_GAME_STATS, teamId, eventId);
            var result = JsonSerializer.Deserialize<TeamEvent>(await GetRequestAsync(url));
            return result!;
        }

        /// <summary> Will work with any valid JWT. Will display only your team data if not from IOS.</summary>
        /// <param name="query"></param>
        /// <returns>
        /// <param name="SearchResults"></param>
        /// </returns>
        public async Task<SearchResults> SearchTeamsAsync(string query, string sport)
        {
            var url = string.Format(SEARCH, query, sport);
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
            var token = _memoryCache.Get<AuthorizationToken>(key: "gc-token");
            if (token == null)
                await GetRefreshToken(REFRESH_TOKEN);
            token = _memoryCache.Get<AuthorizationToken>(key: "gc-token");
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("gc-token", token?.access.data);
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();
        }


        public async Task  GetRefreshToken(string oldToken)
        {
            var payload = new { type = "refresh" };
            var context = _authService.GetNewContext();
            var clientRequestSignature = _authService.SignPayload(context, payload);
            var response = await _authService.MakePostRequestAync(context, JsonSerializer.Serialize(payload), clientRequestSignature, oldToken);
            var refreshToken = await response.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<AuthorizationToken>(refreshToken);
            _memoryCache.Set<AuthorizationToken>(key: "gc-token", value: result);
        }
    }
}
