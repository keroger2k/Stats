namespace Stats.ExtApi.Models
{
    public static class APIEndpoint
    {
        public readonly static string TEAM_SEASON_STATS = "/teams/{0}/season-stats";
        public readonly static string PLAYER_INFO = "/players/{0}";
        public readonly static string TEAM_GAME_DATA = "/teams/{0}/schedule/batch-simple-scorekeeping-data/";
        public readonly static string TEAM_GAME_STATS = "/teams/{0}/schedule/events/{1}/player-stats";
        public readonly static string TEAM_INFO = "/teams/{0}";
        public readonly static string TEAM_AVATAR = "/teams/{0}/avatar-image";
        public readonly static string TEAM_SCHEDULE = "/teams/{0}/schedule/?fetch_place_details=true";
        public readonly static string SEARCH = "/search/team?name={0}&sport={1}&start_at=0";
        public readonly static string TEAM_VIDEO_ASSETS = "/teams/{0}/video-stream/assets";
        public readonly static string PLAYER_CLIP_ASSETS = "/teams/{0}/video-clips/player/{1}/clips";
        public readonly static string PLAYER_CLIP_COOKIES = "/teams/{0}/video-clips/playable-clip/{1}/clip";
        public readonly static string EVENT_VIDEO_ASSETS = "/teams/{0}/schedule/events/{1}/video-stream/assets";
        public readonly static string VIDEO_STREAM = "/teams/{0}/schedule/events/{1}/video-stream";
        public readonly static string TEAM_USERS = "/teams/{0}/users";
        public readonly static string TEAM_OPPONENTS = "/teams/{0}/opponents";
        public readonly static string TEAM_PLAYERS = "/teams/{0}/players";
        public readonly static string VIDEO_ASSETS_PLAYBACK = "/teams/{0}/schedule/events/{1}/video-stream/assets/playback";
        public readonly static string GAME_RECAP_STORY = "/game-streams/gamestream-recap-story/{0}";
        public readonly static string GAME_RECAP_PAYLOAD = "/game-streams/gamestream-viewer-payload-lite/{0}?stream_id={1}";
    }
}
