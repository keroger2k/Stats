using AutoMapper;
using Stats.Database.Models;
using Stats.ExtApi.Models;

namespace Stats.CmdApp.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Team, TeamDTO>();
            CreateMap<Team.Settings, TeamDTO.Settings>();
            CreateMap<Team.Settings.Scorekeeping, TeamDTO.Settings.Scorekeeping>();
            CreateMap<Team.Settings.Scorekeeping.Bats, TeamDTO.Settings.Scorekeeping.Bats>();
            CreateMap<Team.AdminTeam, TeamDTO.AdminTeam>();
            CreateMap<TeamPlayer, TeamPlayerDTO>();
            CreateMap<TeamPlayer.BattingThrowingInfo, TeamPlayerDTO.BattingThrowingInfo>();
            CreateMap<TeamSchedule, TeamTransform.TeamSchedule>();
            CreateMap<TeamSchedule.Event, TeamTransform.TeamSchedule.Event>();
            CreateMap<TeamSchedule.Event.End, TeamTransform.TeamSchedule.Event.End>();
            CreateMap<TeamSchedule.Event.Start, TeamTransform.TeamSchedule.Event.Start>();
            CreateMap<TeamSchedule.Event.Arrive, TeamTransform.TeamSchedule.Event.Arrive>();
            CreateMap<TeamSchedule.Event.Location, TeamTransform.TeamSchedule.Event.Location>();
            CreateMap<TeamSchedule.Event.Location.Coordinates, TeamTransform.TeamSchedule.Event.Location.Coordinates>();
            CreateMap<TeamSchedule.PregameData, TeamTransform.TeamSchedule.PregameData>();
            CreateMap<TeamSchedule.PregameData.Opponent, TeamTransform.TeamSchedule.PregameData.Opponent>();
            CreateMap<StatsData.PlayerStats, TeamTransform.Event.PlayerStats>();
            CreateMap<StatsData.PlayerStats.Defense, TeamTransform.Event.PlayerStats.Defense>();
            CreateMap<StatsData.PlayerStats.General, TeamTransform.Event.PlayerStats.General>();
            CreateMap<StatsData.PlayerStats.Offense, TeamTransform.Event.PlayerStats.Offense>();
            CreateMap<Game, TeamTransform.Game>();
            CreateMap<Game.GameData, TeamTransform.Game.GameData>();

        }
    }
}
