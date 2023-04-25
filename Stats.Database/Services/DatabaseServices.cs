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

        public DatabaseService(IOptions<DatabaseSettings> statsDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                statsDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                statsDatabaseSettings.Value.DatabaseName);

            _statsCollection = mongoDatabase.GetCollection<TeamDTO>(
                statsDatabaseSettings.Value.TeamCollectionName);
        }

        public async Task<List<TeamDTO>> GetAsync() =>
            await _statsCollection.Find(_ => true).ToListAsync();

        public async Task<TeamDTO?> GetAsync(string id) =>
            await _statsCollection.Find(x => x.id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TeamDTO newTeamDTO) =>
            await _statsCollection.InsertOneAsync(newTeamDTO);

        public async Task UpdateAsync(string id, TeamDTO updateTeamDTO) =>
            await _statsCollection.ReplaceOneAsync(x => x.id == id, updateTeamDTO);

        public async Task RemoveAsync(string id) =>
            await _statsCollection.DeleteOneAsync(x => x.id == id);
    }
}
