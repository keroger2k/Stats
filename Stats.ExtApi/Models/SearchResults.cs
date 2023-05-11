
namespace Stats.ExtApi.Models
{
    /// <summary>
    /// 
    /// Referenced API Endpoint: "/search/team?name={0}&sport={1}"
    /// 
    /// Filter by:
    /// City
    /// State
    /// Sports - Sport Options: [baseball, softball, etc.]
    /// Season
    /// Year
    /// 
    /// </summary>
    public class SearchResults
    {
        public IEnumerable<SearchItem> hits { get; set; } = null!;

        public class SearchItem
        {
            public string id { get; set; } = null!;
            public string name { get; set; } = null!;
            public string sport { get; set; } = null!;
            public SeasonInfo team_season { get; set; } = null!;
            public bool is_orphan { get; set; }
            public string competition_level { get; set; } = null!;
            public string age_group { get; set; } = null!;
            public int number_of_players { get; set; }
            public string[] staff { get; set; } = null!;
            public Place? location { get; set; }

            public class Place
            {
                public string city { get; set; } = null!;
                public string country { get; set; } = null!;
                public string state { get; set; } = null!;
            }
            public class SeasonInfo
            {
                public string season { get; set; } = null!;

                public int year { get; set; }
            }
        }
    }
}
