using MongoDB.Driver;
using Stats.Database.Models;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using MongoDB.Bson;

namespace Stats.Database.Services
{
    public class DatabaseService
    {
        private readonly IMongoCollection<TeamDTO> _statsCollection;
        private readonly IOptions<DatabaseSettings> _statsDatabaseSettings;
        public DatabaseService(IOptions<DatabaseSettings> statsDatabaseSettings)
        {
            _statsDatabaseSettings = statsDatabaseSettings;
            var mongoClient = new MongoClient(_statsDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(_statsDatabaseSettings.Value.DatabaseName);
            _statsCollection = mongoDatabase.GetCollection<TeamDTO>(_statsDatabaseSettings.Value.TeamCollectionName);
        }

        private IMongoCollection<T> ConnectToMongo<T>(in string collection)
        {
            var client = new MongoClient(_statsDatabaseSettings.Value.ConnectionString);
            var db = client.GetDatabase(_statsDatabaseSettings.Value.DatabaseName);
            return db.GetCollection<T>(collection);
        }


        public async Task CreateTeamAsync(TeamDTO newTeamDTO)
        {
            var teamCollection = ConnectToMongo<TeamDTO>(_statsDatabaseSettings.Value.TeamCollectionName);
            var existingTeam = teamCollection.FindAsync(t => t.id == newTeamDTO.id);
            if (existingTeam == null)
            {
                await teamCollection.InsertOneAsync(newTeamDTO);
            }
            else
            {
                await teamCollection.ReplaceOneAsync(
                filter: new BsonDocument("_id", newTeamDTO.id),
                options: new ReplaceOptions { IsUpsert = true },
                replacement: newTeamDTO
                );
            }

        }

        //public async Task AddTeamPlayerAsync(TeamPlayerDTO player)
        //{
        //    var playerCollection = ConnectToMongo<TeamPlayerDTO>(_statsDatabaseSettings.Value.PlayerCollectionName);
        //    var existingPlayer = playerCollection.FindAsync(t => t.id == player.id);
        //    if (existingPlayer == null)
        //    {
        //        await playerCollection.InsertOneAsync(player);
        //    }
        //    else
        //    {
        //        await playerCollection.ReplaceOneAsync(
        //        filter: new BsonDocument("_id", player.id),
        //        options: new ReplaceOptions { IsUpsert = true },
        //        replacement: player
        //        );
        //    }
        //}
       
        //public async Task AddTeamEventsAsync(IEnumerable<TeamScheduleDTO> events)
        //{
        //    var eventCollection = ConnectToMongo<TeamScheduleDTO>(_statsDatabaseSettings.Value.EventCollectionName);
            
        //    foreach(var evt in events)
        //    {
        //        var existingPlayer = eventCollection.FindAsync(t => t.@event.id == evt.@event.id);
        //        if (existingPlayer == null)
        //        {
        //            await eventCollection.InsertOneAsync(evt);
        //        }
        //        else
        //        {
        //            await eventCollection.ReplaceOneAsync(
        //            filter: new BsonDocument("_id", evt.@event.id),
        //            options: new ReplaceOptions { IsUpsert = true },
        //            replacement: evt
        //            );
        //        }
        //    }
        //}

    }
}
