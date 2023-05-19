using AutoMapper;
using Stats.Database.Models;

namespace Stats.CmdApp.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Stats.ExtApi.Models.TeamSchedule, TeamTransform.TeamSchedule>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event, TeamTransform.TeamSchedule.Event>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.End, TeamTransform.TeamSchedule.Event.End>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Start, TeamTransform.TeamSchedule.Event.Start>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Arrive, TeamTransform.TeamSchedule.Event.Arrive>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location, TeamTransform.TeamSchedule.Event.Location>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location.Coordinates, TeamTransform.TeamSchedule.Event.Location.Coordinates>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData, TeamTransform.TeamSchedule.PregameData>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData.Opponent, TeamTransform.TeamSchedule.PregameData.Opponent>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats, TeamTransform.PlayerStats>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Defense, TeamTransform.PlayerStats.Defense>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.General, TeamTransform.PlayerStats.General>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Offense, TeamTransform.PlayerStats.Offense>();
            CreateMap<Stats.ExtApi.Models.Game, TeamTransform.Game>();
            CreateMap<Stats.ExtApi.Models.Game.GameData, TeamTransform.Game.GameData>();
            CreateMap<Stats.ExtApi.Models.TeamSeasonStats, TeamTransform.SeasonStats>();
            CreateMap<Stats.ExtApi.Models.StatsData, TeamTransform.StatsData>();
            CreateMap<Stats.ExtApi.Models.StatsData.Player, TeamTransform.StatsData.Player>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats, TeamTransform.PlayerStats>();
            CreateMap<Stats.ExtApi.Models.VideoAsset, TeamTransform.VideoAsset>();
        }
    }
}
