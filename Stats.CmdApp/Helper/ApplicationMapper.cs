using AutoMapper;
using Stats.Database.Models;

namespace Stats.CmdApp.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<Stats.ExtApi.Models.TeamSchedule, TeamTransform.TeamSchedule1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event, TeamTransform.TeamSchedule1.Event1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.End, TeamTransform.TeamSchedule1.Event1.End1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Start, TeamTransform.TeamSchedule1.Event1.Start1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Arrive, TeamTransform.TeamSchedule1.Event1.Arrive1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location, TeamTransform.TeamSchedule1.Event1.Location1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location.Coordinates, TeamTransform.TeamSchedule1.Event1.Location1.Coordinates1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData, TeamTransform.TeamSchedule1.PregameData1>();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData.Opponent, TeamTransform.TeamSchedule1.PregameData1.Opponent1>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats, TeamTransform.PlayerStats>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Defense, TeamTransform.PlayerStats.Defense>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.General, TeamTransform.PlayerStats.General>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Offense, TeamTransform.PlayerStats.Offense>();
            CreateMap<Stats.ExtApi.Models.Game, TeamTransform.TeamGame>();
            CreateMap<Stats.ExtApi.Models.Game.GameData, TeamTransform.TeamGame.TeamGameData>();
            CreateMap<Stats.ExtApi.Models.TeamSeasonStats, TeamTransform.SeasonStats>();
            CreateMap<Stats.ExtApi.Models.StatsData, TeamTransform.StatsData>();
            CreateMap<Stats.ExtApi.Models.StatsData.Player, TeamTransform.StatsData.StatsPlayer>();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats, TeamTransform.PlayerStats>();
            CreateMap<Stats.ExtApi.Models.VideoAsset, TeamTransform.VideoAsset>();
        }
    }
}
