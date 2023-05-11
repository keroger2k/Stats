using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stats.Database.Models
{
    public class AuthorizationToken
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string type { get; set; } = string.Empty;
        public Token access { get; set; } = null!;
        public Token refresh { get; set; } = null!;


        public class Token
        {
            public string data { get; set; } = string.Empty;
            public int expires { get; set; }
        }
    }
}
