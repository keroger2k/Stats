using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Stats.Database.Models;
using Stats.Models;

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

        public async Task<AvatarImage> GetTeamAvatarImageAsync(string id)
        {
            var imageCollection = ConnectToMongo<AvatarImage>(_statsDatabaseSettings.Value.ImageCollectionName);
            var avatar = await imageCollection.FindAsync(t => t.Id == id);
            return avatar.FirstOrDefault();
        }

        public async Task CreateImageAsync(AvatarImage image)
        {
            var imageCollection = ConnectToMongo<AvatarImage>(_statsDatabaseSettings.Value.ImageCollectionName);
            var existingImage = imageCollection.FindAsync(c => c.Id == image.Id);
            if (existingImage == null)
            {
                await imageCollection.InsertOneAsync(image);
            }
            else
            {
                await imageCollection.ReplaceOneAsync(
                filter: new BsonDocument("_id", image.Id),
                options: new ReplaceOptions { IsUpsert = true },
                replacement: image
                );
            }
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

        public async Task CreateTokenAsync(Stats.Database.Models.AuthorizationToken token)
        {
            var tokenCollection = ConnectToMongo<Stats.Database.Models.AuthorizationToken>(_statsDatabaseSettings.Value.TokenCollectionName);
            var existingToken = tokenCollection.Find(c => true).First();
            token.Id = existingToken.Id;
            await tokenCollection.ReplaceOneAsync(
                filter: new BsonDocument("_id", existingToken.Id),
                options: new ReplaceOptions { IsUpsert = true },
                replacement: token
            );
        }

        public async Task<IEnumerable<TeamTransform>> GetTeamsAsync()
        {
            var filter = Builders<TeamTransform>.Filter.Empty;
            var projection = Builders<TeamTransform>.Projection.Expression(c => new TeamTransform
            {
                id = c.id,
                name = c.name,
            });
            var options = new FindOptions<TeamTransform, TeamTransform> { Projection = projection };
            var teamCollection = ConnectToMongo<TeamTransform>(_statsDatabaseSettings.Value.TeamCollectionName);
            var existingTeam = await teamCollection.FindAsync(filter, options);
            var r = await existingTeam.ToListAsync();
            return r;
        }

        public async Task<TeamTransform> GetTeamAsync(string id)
        {
            var teamCollection = ConnectToMongo<TeamTransform>(_statsDatabaseSettings.Value.TeamCollectionName);
            var existingTeam = await teamCollection.FindAsync(t => t.id == id);
            return existingTeam.FirstOrDefault();
        }

        public async Task<Stats.Database.Models.AuthorizationToken> GetTokenAsync()
        {
            var tokenCollection = ConnectToMongo<Stats.Database.Models.AuthorizationToken>(_statsDatabaseSettings.Value.TokenCollectionName);
            var existingTeam = await tokenCollection.FindAsync(t => true);
            return existingTeam.First();
        }
    }
}
