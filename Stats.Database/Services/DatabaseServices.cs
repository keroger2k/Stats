using MongoDB.Driver;
using Stats.Database.Models;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;

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


        public Task CreateTeamAsync(TeamDTO newTeamDTO)
        {
            var teamCollection = ConnectToMongo<TeamDTO>(_statsDatabaseSettings.Value.TeamCollectionName);
            return teamCollection.InsertOneAsync(newTeamDTO);
        }

        public Task AddTeamPlayerAsync(TeamPlayerDTO player)
        {
            var teamCollection = ConnectToMongo<TeamPlayerDTO>(_statsDatabaseSettings.Value.PlayerCollectionName);
            return teamCollection.InsertOneAsync(player);
        }
        public Task AddTeamPlayersAsync(IEnumerable<TeamPlayerDTO> players)
        {
            var teamCollection = ConnectToMongo<TeamPlayerDTO>(_statsDatabaseSettings.Value.PlayerCollectionName);
            return teamCollection.InsertManyAsync(players);
        }

    }
}
