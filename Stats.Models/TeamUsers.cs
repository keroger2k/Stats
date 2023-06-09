namespace Stats.Models 
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/users"
    /// 
    /// </summary>
    public class TeamUsers
    {
        public string id { get; set; } = null!;
        public string first_name { get; set; } = null!;
        public string last_name { get; set; } = null!;
        public string email { get; set; } = null!;
        public string status { get; set; } = null!;
    }
}

