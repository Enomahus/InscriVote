using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Configuration
{
    public class DataConfiguration
    {
        public string DefaultUserPassword { get; set; }
        public bool Seed { get; set; } = false;
        public bool SeedTest { get; set; } = false;
    }
}
