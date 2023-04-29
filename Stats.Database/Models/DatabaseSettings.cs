namespace Stats.Database.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TeamCollectionName { get; set; } = null!;
    }
}
