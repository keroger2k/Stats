using AutoMapper;
using Serilog;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.Models;
using Stats.ExtApi.Services;
using Stats.API.Models;
using M3U8Parser.Attributes;

namespace Stats.API.Helper
{
    public class ExternalAPIService
    {
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly DataProcessingService _dps;
        private readonly IMapper _mapper;
        public ExternalAPIService(GameChangerService gameChangerService, DatabaseService db,
            DataProcessingService dps, IMapper mapper)
        {
            _gameChangerService = gameChangerService;
            _dps = dps;
            _mapper = mapper;
            _db = db;
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideos(string teamId, string eventId)
        {
            var results = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(teamId, eventId);
            return results;
        }

        public async Task<IEnumerable<VideoPlayback>> GetTeamEventVideosPlayback(string teamId, string eventId)
        {
            var results = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(teamId, eventId);
            return results;
        }

        public async Task<TeamTransform> CheckTeamStatus(string id)
        {
            var team = await _db.GetTeamAsync(id);
            if (team == null || _dps.TeamNeedsUpdated(team))
            {
                await ImportTeamInfoAsync(id);
                team = await _db.GetTeamAsync(id);
            }
            return team;
        }

        public async Task ImportTeamInfoAsync(string id)
        {
            var teamTransform = new TeamTransform();
            var team = await _gameChangerService.GetTeamAsync(id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            var opponents = await _gameChangerService.GetTeamOpponentsAsync(id);
            var videos = await _gameChangerService.GetTeamVideoAssetsAsync(id);

            if (season_stats != null)
            {
                teamTransform.season_stats = season_stats;
                var players = await _gameChangerService.GetPlayers(season_stats.stats_data.players.Keys.ToArray());
                teamTransform.players = players.ToList();
            }
            teamTransform.id = team.id;
            teamTransform.name = team.name;
            teamTransform.created_at = team.created_at;
            teamTransform.updated_at = team.updated_at;
            teamTransform.sport = team.sport;
            teamTransform.city = team.city;
            teamTransform.state = team.state;
            teamTransform.country = team.country;
            teamTransform.age_group = team.age_group;
            teamTransform.season_name = team.season_name;
            teamTransform.season_year = team.season_year;
            teamTransform.team_avatar_image = "";
            teamTransform.schedule = teamSchedule.ToList();
            teamTransform.completed_game_scores = scores.ToList();
            teamTransform.opponents = opponents.ToList();
            teamTransform.video_assets = videos.ToList();

            foreach (var evt in teamTransform.schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now)
                .Where(c => !c.@event.sub_type.Contains("scrimmages")))
            {
                try
                {
                    TeamEvent game = await _gameChangerService.GetTeamEventStatsAsync(team.id, evt.@event.id);
                    teamTransform.completed_games.Add(game);
                }
                catch (Exception)
                {
                    Log.Logger.Information($"ExternalAPIService::EventNotFound({evt.@event.id})");
                }
            }
            await _db.CreateTeamAsync(teamTransform);
            var image = await _gameChangerService.GetTeamAvatarAsync(team.id);
            await _dps.StoreImageFromUrlAsync(team.id, image.full_media_url);
        }

        public async Task<OpenOpponentVideos> FindOpenOpponentVideo(string oid, string id)
        {
            var opp = await _db.GetTeamAsync(oid);
            var team = await _db.GetTeamAsync(id);
            var result = new OpenOpponentVideos();
            //find interesting team as their opponent
            var opponentEventWithTeam = opp.opponents.Where(c => c.progenitor_team_id == team.id);
            foreach (var opponentEvent in opponentEventWithTeam)
            {
                //find interesting team on opponents schedule
                var oppScheduledItem = opp.schedule.Where(c => c.pregame_data != null && c.pregame_data.opponent_id == opponentEvent.root_team_id);
                if (oppScheduledItem.Any())
                {
                    foreach (var evt in oppScheduledItem)
                    {
                        //find interest team event in opponents completed games
                        var theEventFinally = opp.completed_games.FirstOrDefault(c => c.event_id == evt.@event.id);
                        if (theEventFinally != null)
                        {
                            //Console.WriteLine($"Found {opp.name} event with {team.name}: {theEventFinally.event_id}");
                            //get all the video assets for the opponent
                            try
                            {
                                var playbackInfo = await _gameChangerService.GetTeamEventVideoAssetsPlaybackAsync(opp.id, theEventFinally.event_id);
                                var videoAssets = await _gameChangerService.GetTeamVideoAssetsAsync(opp.id);

                                foreach (var vid in playbackInfo.DistinctBy(c => c.url))
                                {
                                    var asset = videoAssets.First(c => c.schedule_event_id == vid.schedule_event_id);
                                    Console.WriteLine($"Downloading: {opp.name} has public video of {team.name}:{vid.schedule_event_id}");
                                    result.videos.Add(new OpenOpponentVideo
                                    {
                                        Asset = asset,
                                        Url = vid.url,
                                        CloudFrontCookie = vid.cookies
                                    });
                                }
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }
            }
            return result;
        }

    }
}
