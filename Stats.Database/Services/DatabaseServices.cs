using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Stats.Database.Models;

namespace Stats.Database.Services
{
    public class DatabaseService
    {
        private readonly IOptions<DatabaseSettings> _statsDatabaseSettings;
        public DatabaseService(IOptions<DatabaseSettings> statsDatabaseSettings)
        {
            _statsDatabaseSettings = statsDatabaseSettings;
            var mongoClient = new MongoClient(_statsDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(_statsDatabaseSettings.Value.DatabaseName);
        }

        private IMongoCollection<T> ConnectToMongo<T>(in string collection)
        {
            var client = new MongoClient(_statsDatabaseSettings.Value.ConnectionString);
            var db = client.GetDatabase(_statsDatabaseSettings.Value.DatabaseName);
            return db.GetCollection<T>(collection);
        }

        public async Task CreateTeamAsync(TeamTransform team)
        {
            var teamCollection = ConnectToMongo<TeamTransform>(_statsDatabaseSettings.Value.TeamCollectionName);
            var existingTeam = teamCollection.FindAsync(t => t.id == team.id);
            if (existingTeam == null)
            {
                await teamCollection.InsertOneAsync(team);
            }
            else
            {
                await teamCollection.ReplaceOneAsync(
                filter: new BsonDocument("_id", team.id),
                options: new ReplaceOptions { IsUpsert = true },
                replacement: team
                );
            }

        }
    }
}
