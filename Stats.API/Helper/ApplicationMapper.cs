using AutoMapper;

namespace Stats.API.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            // Team
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.Team>();
            // TeamPlayers
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamPlayers>();
            CreateMap<Stats.Database.Models.TeamTransform.Player, Stats.API.Models.TeamPlayers.Player>();
            // TeamStats
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamStats>();
            CreateMap<Stats.Database.Models.TeamTransform.SeasonStats, Stats.API.Models.TeamStats.SeasonStats>();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats, Stats.API.Models.TeamStats.PlayerStats>();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.Offense, Stats.API.Models.TeamStats.PlayerStats.Offense>();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.General, Stats.API.Models.TeamStats.PlayerStats.General>();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.Defense, Stats.API.Models.TeamStats.PlayerStats.Defense>();
            CreateMap<Stats.Database.Models.TeamTransform.SeasonStats.StatsData, Stats.API.Models.TeamStats.SeasonStats.StatsData>();
            CreateMap<Stats.Database.Models.TeamTransform.SeasonStats.StatsData.Player, Stats.API.Models.TeamStats.SeasonStats.StatsData.Player>();

        }
    }
}
