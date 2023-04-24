namespace Stats.ExtApi.Models
{
    public class Team
    {
        public string id { get; set; } = null!;
        public string name { get; set; } = null!;
        public string team_type { get; set; } = null!;
        public int meta_seq { get; set; }
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
        public object teamExternalAssociation { get; set; } = null!;
        public object maxPrepsSyncState { get; set; } = null!;
        public List<object> organizations { get; set; } = null!;
        public Settings settings { get; set; } = null!;
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
        public object paid_access_level { get; set; } = null!;
        public string scorekeeping_access_level { get; set; } = null!;
        public string streaming_access_level { get; set; } = null!;
        public string ngb { get; set; } = null!;
        public List<object> user_team_associations { get; set; } = null!;
        public object team_avatar_image { get; set; } = null!;
        public object team_player_count { get; set; } = null!;

        public class AdminTeam
        {
            public string root_team_id { get; set; } = null!;
            public string age_group { get; set; } = null!;
            public string city { get; set; } = null!;
            public string competition_level { get; set; } = null!;
            public string country { get; set; } = null!;
            public string ngb { get; set; } = null!;
            public object paid_access_level { get; set; } = null!;
            public object rolled_over_from_team_id { get; set; } = null!;
            public object scorekeeping_access_level { get; set; } = null!;
            public string season_name { get; set; } = null!;
            public int season_year { get; set; }
            public string sport { get; set; } = null!;
            public object stat_access_level { get; set; } = null!;
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
                    public object pitch_count_alert_1 { get; set; } = null!;
                    public object pitch_count_alert_2 { get; set; } = null!;
                    public string shortfielder_type { get; set; } = null!;
                    public string meta_seq { get; set; } = null!;
                    public DateTime created_at { get; set; }
                    public DateTime updated_at { get; set; }
                }
            }
        }
    }
}
