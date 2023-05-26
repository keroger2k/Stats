namespace Stats.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/players/:playerID"
    /// Referenced API Endpoint: "/teams/:teamID/players" (iOS JWT Token ONLY)
    /// 
    /// </summary>
    public class TeamPlayer
    {
        public string id { get; set; } = null!;

        public string first_name { get; set; } = null!;

        public string last_name { get; set; } = null!;

        public string number { get; set; } = null!;

        public string status { get; set; } = null!;

        public string team_id { get; set; } = null!;

        public string user_id { get; set; } = null!;

        public int meta_seq { get; set; }

        public DateTime created_at { get; set; }

        public DateTime updated_at { get; set; }

        public BattingThrowingInfo bats { get; set; } = null!;

        public string person_id { get; set; } = null!;
        public class BattingThrowingInfo
        {
            public string player_id { get; set; } = null!;

            public string batting_side { get; set; } = null!;

            public string throwing_hand { get; set; } = null!;

            public string meta_seq { get; set; } = null!;

            public DateTime created_at { get; set; }

            public DateTime updated_at { get; set; }

        }
    }
}
