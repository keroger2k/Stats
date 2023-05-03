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
            //TeamSchedule
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamSchedule>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule, Stats.API.Models.TeamSchedule.Schedule>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event, Stats.API.Models.TeamSchedule.Schedule.Event>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event.Location, Stats.API.Models.TeamSchedule.Schedule.Event.Location>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event.Location.Coordinates, Stats.API.Models.TeamSchedule.Schedule.Event.Location.Coordinates>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event.End, Stats.API.Models.TeamSchedule.Schedule.Event.End>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event.Start, Stats.API.Models.TeamSchedule.Schedule.Event.Start>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.Event.Arrive, Stats.API.Models.TeamSchedule.Schedule.Event.Arrive>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.PregameData, Stats.API.Models.TeamSchedule.Schedule.PregameData>();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule.PregameData.Opponent, Stats.API.Models.TeamSchedule.Schedule.PregameData.Opponent>();
            CreateMap<Stats.Database.Models.TeamTransform.Game, Stats.API.Models.TeamSchedule.Game>();
            CreateMap<Stats.Database.Models.TeamTransform.Game.GameData, Stats.API.Models.TeamSchedule.Game.GameData>();

        }
    }
}
