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
            CreateMap<TeamSchedule, TeamScheduleDTO>();
            CreateMap<TeamSchedule.Event, TeamScheduleDTO.Event>();
            CreateMap<TeamSchedule.Event.End, TeamScheduleDTO.Event.End>();
            CreateMap<TeamSchedule.Event.Start, TeamScheduleDTO.Event.Start>();
            CreateMap<TeamSchedule.Event.Arrive, TeamScheduleDTO.Event.Arrive>();
            CreateMap<TeamSchedule.Event.Location, TeamScheduleDTO.Event.Location>();
            CreateMap<TeamSchedule.Event.Location.Coordinates, TeamScheduleDTO.Event.Location.Coordinates>();
            CreateMap<TeamSchedule.PregameData, TeamScheduleDTO.PregameData>();
            CreateMap<TeamSchedule.PregameData.Opponent, TeamScheduleDTO.PregameData.Opponent>();
        }
    }
}
