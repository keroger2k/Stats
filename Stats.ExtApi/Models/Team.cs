namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/teams/:teamID"
    /// 
    /// </summary>
    public class Team
    {
        public string id { get; set; } = null!;
        public string name { get; set; } = null!;
        public string team_type { get; set; } = null!;
        public int meta_seq { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public string teamExternalAssociation { get; set; } = null!;
        public string maxPrepsSyncState { get; set; } = null!;
        public IEnumerable<Organization> organizations { get; set; } = new List<Organization>();
        public AdminTeam adminTeam { get; set; } = null!;
        public string sport { get; set; } = null!;
        public string city { get; set; } = null!;
        public string state { get; set; } = null!;
        public string country { get; set; } = null!;
        public string age_group { get; set; } = null!;
        public string season_name { get; set; } = null!;
        public int season_year { get; set; }
        public string competition_level { get; set; } = null!;
        public string stat_access_level { get; set; } = null!;
        public string paid_access_level { get; set; } = null!;
        public string scorekeeping_access_level { get; set; } = null!;
        public string streaming_access_level { get; set; } = null!;
        public string ngb { get; set; } = null!;
        public List<string> user_team_associations { get; set; } = null!;
        public string team_avatar_image { get; set; } = null!;
        public string team_player_count { get; set; } = null!;

        public class Organization
        {
            public string organization_id { get; set; } = string.Empty!;
            public string status { get; set; } = string.Empty!;
        }

        public class AdminTeam
        {
            public string root_team_id { get; set; } = null!;
            public string age_group { get; set; } = null!;
            public string city { get; set; } = null!;
            public string competition_level { get; set; } = null!;
            public string country { get; set; } = null!;
            public string ngb { get; set; } = null!;
            public string paid_access_level { get; set; } = null!;
            public string rolled_over_from_team_id { get; set; } = null!;
            public string scorekeeping_access_level { get; set; } = null!;
            public string season_name { get; set; } = null!;
            public int season_year { get; set; }
            public string sport { get; set; } = null!;
            public string stat_access_level { get; set; } = null!;
            public string state { get; set; } = null!;
            public string streaming_access_level { get; set; } = null!;
            public string meta_seq { get; set; } = null!;
            public DateTime created_at { get; set; }
            public DateTime updated_at { get; set; }
        }

        public class Settings
        {
            public Scorekeeping scorekeeping { get; set; } = null!;

            public class Scorekeeping
            {
                public Bats bats { get; set; } = null!;

                public class Bats
                {
                    public int innings_per_game { get; set; }
                    public string pitch_count_alert_1 { get; set; } = null!;
                    public string pitch_count_alert_2 { get; set; } = null!;
                    public string shortfielder_type { get; set; } = null!;
                    public string meta_seq { get; set; } = null!;
                    public DateTime created_at { get; set; }
                    public DateTime updated_at { get; set; }
                }
            }
        }
    }
}
