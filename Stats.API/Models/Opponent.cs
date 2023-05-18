
namespace Stats.API.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID/opponents"
    /// 
    /// </summary>
    public class Opponent
    {   
        public string root_team_id { get; set; } = null!;
        public string owning_team_id { get; set; } = null!;
        public string progenitor_team_id { get; set; } = null!;
        public string name { get; set; } = null!;
        public bool is_hidden { get; set; }
    }
}