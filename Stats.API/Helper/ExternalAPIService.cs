using AutoMapper;
using Stats.Database.Models;
using Stats.Database.Services;
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
        public async Task ImportTeamInfoAsync(string id)
        {
            var team = await _gameChangerService.GetTeamAsync(id);
            var teamPlayers = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            var teamSchedule = await _gameChangerService.GetTeamScheduledEventsAsync(id);
            var scores = await _gameChangerService.GetTeamGameDataAsync(id);
            var season_stats = await _gameChangerService.GetTeamSeasonStatsAsync(id);
            var video_assets1 = await _gameChangerService.GetTeamVideoAssetsAsync(id);
            var avatar = await _gameChangerService.GetTeamAvatarAsync(id);

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
                team_avatar_image = avatar.full_media_url,
                schedule = _mapper.Map<List<TeamTransform.TeamSchedule>>(teamSchedule.ToList()),
                completed_game_scores = _mapper.Map<List<TeamTransform.Game>>(scores),
                season_stats = _mapper.Map<TeamTransform.SeasonStats>(season_stats),
                video_assets = _mapper.Map<List<TeamTransform.VideoAsset>>(video_assets1)
            };

            foreach (var playerId in teamPlayers.stats_data.players.Keys)
            {
                var player = await _gameChangerService.GetPlayer(playerId);
                teamTransform.players.Add(new TeamTransform.Player()
                {
                    id = player.id,
                    first_name = player.first_name,
                    last_name = player.last_name,
                    number = player.number,
                    status = player.status,
                    team_id = player.team_id,
                    person_id = player.person_id,
                    batting_side = (player.bats == null) ? "" : player.bats.batting_side,
                    throwing_hand = (player.bats == null) ? "" : player.bats.throwing_hand
                });
            }


            foreach (var evt in teamTransform.schedule.Where(c => c.@event.event_type.Equals("game"))
                .Where(c => !c.@event.status.Equals("canceled"))
                .Where(c => c.@event.start.datetime < DateTime.Now)
                .Where(c => !c.@event.sub_type.Contains("scrimmages")))
            {
                try
                {
                    var game = await _gameChangerService.GetTeamEventStatsAsync(team.id, evt.@event.id);
                    var eventPlayers = new TeamTransform.EventStats()
                    {
                        id = game.event_id,
                        boxscore = _mapper.Map<TeamTransform.PlayerStats>(game.player_stats.stats)
                    };
                    eventPlayers.players = new Dictionary<string, TeamTransform.PlayerStats>();

                    foreach (var player in game.player_stats.players)
                    {
                        eventPlayers.players.Add(player.Key, _mapper.Map<TeamTransform.PlayerStats>(player.Value.stats));
                    }

                    teamTransform.completed_games.Add(eventPlayers);
                }
                catch (Exception)
                {


                }

            }

            await _db.CreateTeamAsync(teamTransform);
        }
    }
}
