using MongoDB.Driver;
using Stats.Database.Models;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Stats.Database.Services
{
    public class DatabaseService
    {
        private readonly IMongoCollection<Team> _statsCollection;

        public DatabaseService(
            IOptions<DatabaseSettings> statsDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                statsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                statsDatabaseSettings.Value.DatabaseName);

            _statsCollection = mongoDatabase.GetCollection<Team>(
                statsDatabaseSettings.Value.BooksCollectionName);
        }

        public async Task<List<Team>> GetAsync() =>
            await _statsCollection.Find(_ => true).ToListAsync();

        public async Task<Team?> GetAsync(string id) =>
            await _statsCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Team newTeam) =>
            await _statsCollection.InsertOneAsync(newTeam);

        public async Task UpdateAsync(string id, Team updateTeam) =>
            await _statsCollection.ReplaceOneAsync(x => x.id == id, updateTeam);

        public async Task RemoveAsync(string id) =>
            await _statsCollection.DeleteOneAsync(x => x.id == id);
    }
}
