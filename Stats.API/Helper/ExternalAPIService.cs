using AutoMapper;
using Serilog;
using Stats.Database.Models;
using Stats.Database.Services;
using Stats.Models;
using Stats.ExtApi.Services;

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
    }
}
