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

        public async Task CreateTokenAsync(AuthorizationToken token)
        {
            var tokenCollection = ConnectToMongo<AuthorizationToken>(_statsDatabaseSettings.Value.TokenCollectionName);
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

        public Dictionary<int, Dictionary<string, int>> GetTeamPitchSmart(TeamTransform team)
        {
            var interestingGames = team.schedule.Where(e => e.@event.event_type == "game")
                .Where(e => e.@event.start.datetime < DateTime.Today && e.@event.start.datetime > DateTime.Today.AddDays(-5))
                .ToList();
            var result = new TeamTransform
            {
                id = team.id,
                name = team.name,
                players = team.players,
                schedule = interestingGames,
                completed_games = team.completed_games
                .Skip(team.completed_games.Count - interestingGames.Count)
                .Take(interestingGames.Count).ToList()
            };

            var data = new Dictionary<int, Dictionary<string, int>>();

            for(var i = 0; i < 5; i++)
            {
                var pData = new Dictionary<string, int>();
                var games = interestingGames.Where(c => c.@event.start.datetime.Date == DateTime.Today.AddDays(i * -1));
                foreach(var game in games)
                {
                    var gameData = result.completed_games.FirstOrDefault(c => c.event_id == game.@event.id);
                    if(gameData != null)
                    {
                        foreach (var player in gameData.player_stats.players)
                        {
                            if(player.Value.stats.defense != null)
                            {
                                if (pData.ContainsKey(player.Key))
                                {
                                    pData[player.Key] = pData[player.Key] + player.Value.stats.defense.P;

                                }
                                else if(result.players.Any(c => c.id == player.Key))
                                {
                                    pData.Add(player.Key, player.Value.stats.defense.P);
                                }
                            }
                        }
                    }
                    
                }
                data.Add(i, pData);
            }
            return data;
        }

        public async Task<TeamTransform> GetTeamAsync(string id)
        {
            var teamCollection = ConnectToMongo<TeamTransform>(_statsDatabaseSettings.Value.TeamCollectionName);
            var existingTeam = await teamCollection.FindAsync(t => t.id == id);
            return existingTeam.FirstOrDefault();
        }

        public async Task<AuthorizationToken> GetTokenAsync()
        {
            var tokenCollection = ConnectToMongo<AuthorizationToken>(_statsDatabaseSettings.Value.TokenCollectionName);
            var existingTeam = await tokenCollection.FindAsync(t => true);
            return existingTeam.First();
        }
    }
}
