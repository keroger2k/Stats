using AutoMapper;
using Stats.Database.Models;
using Stats.ExtApi.Models;

namespace Stats.CmdApp.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Team, TeamDTO>().ReverseMap();
        }
    }
}
