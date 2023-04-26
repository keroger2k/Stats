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
        }
    }
}
