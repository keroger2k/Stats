using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Stats.ExtApi.Models
{
    public  class TeamSeasonStats
    {
        public string id { get; set; } = null!;
        public StatsData stats_data { get; set; } = null!;
        public string team_id { get; set; } = null!;
        public string meta_seq { get; set; } = null!;
        public DateTime created_at { get; set; }
        public DateTime updated_at { get; set; }
    }
}
