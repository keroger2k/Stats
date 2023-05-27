using AutoMapper;
using Serilog;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.Models;
using Stats.ExtApi.Services;
using Stats.API.Models;

namespace Stats.API.Helper
{
    public class ExternalAPIService
    {
        private readonly GameChangerService _gameChangerService;
        private readonly DatabaseService _db;
        private readonly IMapper _mapper;
        public ExternalAPIService(GameChangerService gameChangerService, DatabaseService db, IMapper mapper)
        {
            _gameChangerService = gameChangerService;
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
            if (team == null || TeamNeedsUpdated(team))
            {
                await ImportTeamInfoAsync(id);
                team = await _db.GetTeamAsync(id);
            }
            return team;
        }

        private bool TeamNeedsUpdated(TeamTransform result)
        {
            var lastScheduledGame = result.schedule.Last(c => c.@event.event_type == "game" && c.@event.status != "canceled" && c.@event.start.datetime != DateTime.MinValue && c.@event.end.datetime < DateTime.UtcNow);
            var lastCompletedGame = result.completed_games.Any(c => c.event_id == lastScheduledGame.@event.id);
            return !lastCompletedGame; 
        }

        public async Task ImportTeamInfoAsync(string id)
        {
            var team = await _gameChangerService.GetTeamAsync(id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            var opponents = await _gameChangerService.GetTeamOpponentsAsync(id);
            var players = await _gameChangerService.GetPlayers(season_stats.stats_data.players.Keys.ToArray());

            var teamTransform = new TeamTransform()
            {
                id = team.id,
                name = team.name,
                created_at = team.created_at,
                updated_at = team.updated_at,
                sport = team.sport,
                city = team.city,
                state = team.state,
                country = team.country,
                age_group = team.age_group,
                season_name = team.season_name,
                season_year = team.season_year,
                team_avatar_image = "",
                schedule = teamSchedule.ToList(),
                completed_game_scores = scores.ToList(),
                season_stats = season_stats,
                opponents = opponents.ToList(),
                players = players.ToList()
            };

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
