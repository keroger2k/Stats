using AutoMapper;

namespace Stats.API.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            // Team
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.Team>().ReverseMap();
            // TeamPlayers
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamPlayers>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.Player, Stats.API.Models.TeamPlayers.TeamPlayer>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamOpponent1, Stats.API.Models.TeamOpponent>().ReverseMap();

            //Testing
            CreateMap<Stats.ExtApi.Models.TeamSchedule, Stats.Database.Models.TeamTransform.TeamSchedule1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData, Stats.Database.Models.TeamTransform.TeamSchedule1.PregameData1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.PregameData.Opponent, Stats.Database.Models.TeamTransform.TeamSchedule1.PregameData1.Opponent1> ().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Location1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Location.Coordinates, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Location1.Coordinates1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Start, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Start1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.End, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.End1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSchedule.Event.Arrive, Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Arrive1>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.Game, Stats.Database.Models.TeamTransform.TeamGame>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.Game.GameData, Stats.Database.Models.TeamTransform.TeamGame.TeamGameData>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.TeamSeasonStats, Stats.Database.Models.TeamTransform.SeasonStats>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.StatsData, Stats.Database.Models.TeamTransform.StatsData>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.StatsData.Player, Stats.Database.Models.TeamTransform.StatsData.StatsPlayer>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats, Stats.Database.Models.TeamTransform.PlayerStats>().ReverseMap();

            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Defense, Stats.Database.Models.TeamTransform.PlayerStats.Defense>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.Offense, Stats.Database.Models.TeamTransform.PlayerStats.Offense>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.StatsData.PlayerStats.General, Stats.Database.Models.TeamTransform.PlayerStats.General>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.VideoAsset, Stats.Database.Models.TeamTransform.VideoAsset>().ReverseMap();
            CreateMap<Stats.ExtApi.Models.Opponent, Stats.Database.Models.TeamTransform.TeamOpponent1>().ReverseMap();
            
            CreateMap<Stats.ExtApi.Models.TeamEvent, Stats.Database.Models.TeamTransform.TeamEvent>().ReverseMap();



            // TeamStats
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamStats>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.SeasonStats, Stats.API.Models.TeamStats.SeasonStats>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats, Stats.API.Models.TeamStats.PlayerStats>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.Offense, Stats.API.Models.TeamStats.PlayerStats.Offense>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.General, Stats.API.Models.TeamStats.PlayerStats.General>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.PlayerStats.Defense, Stats.API.Models.TeamStats.PlayerStats.Defense>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.StatsData, Stats.API.Models.TeamStats.SeasonStats.StatsData>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.StatsData.StatsPlayer, Stats.API.Models.TeamStats.SeasonStats.StatsData.Player>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.StatsData.StatsPlayer, Stats.API.Models.TeamStats.SeasonStats.StatsData.Player>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.Player, Stats.API.Models.TeamStats.TeamStatsPlayer>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamGame, Stats.API.Models.TeamStats.Game>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamGame.TeamGameData, Stats.API.Models.TeamStats.Game.GameData>().ReverseMap();
            //TeamSchedule
            CreateMap<Stats.Database.Models.TeamTransform, Stats.API.Models.TeamSchedule>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1, Stats.API.Models.TeamSchedule.Schedule>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1, Stats.API.Models.TeamSchedule.Schedule.Event>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Location1, Stats.API.Models.TeamSchedule.Schedule.Event.Location>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Location1.Coordinates1, Stats.API.Models.TeamSchedule.Schedule.Event.Location.Coordinates>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.End1, Stats.API.Models.TeamSchedule.Schedule.Event.End>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Start1, Stats.API.Models.TeamSchedule.Schedule.Event.Start>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.Event1.Arrive1, Stats.API.Models.TeamSchedule.Schedule.Event.Arrive>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.PregameData1, Stats.API.Models.TeamSchedule.Schedule.PregameData>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamSchedule1.PregameData1.Opponent1, Stats.API.Models.TeamSchedule.Schedule.PregameData.Opponent>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamGame, Stats.API.Models.TeamSchedule.Game>().ReverseMap();
            CreateMap<Stats.Database.Models.TeamTransform.TeamGame.TeamGameData, Stats.API.Models.TeamSchedule.Game.GameData>().ReverseMap();

        }
    }
}
