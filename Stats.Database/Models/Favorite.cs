using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Stats.Database.Models
{
    public class Favorite
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; } = null!;

        public string TeamId { get; set; } = null!;
    }
}
