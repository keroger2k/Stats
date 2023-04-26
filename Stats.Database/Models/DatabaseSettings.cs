using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stats.Database.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string TeamCollectionName { get; set; } = null!;
        public string PlayerCollectionName { get; set; } = null!;
        public string EventCollectionName { get; set; } = null!;
    }
}
