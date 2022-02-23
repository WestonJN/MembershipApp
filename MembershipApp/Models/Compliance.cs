using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipApp.Models
{
    public class Compliance
    {
        public int ComplianceId { get; set; }

        public string MemberFullName { get; set; }

        public string Temperature { get; set; }

        public string CurrentDate { get; set; }

        public string Fever { get; set; }

        public string Chills { get; set; }

        public string Breath { get; set; }

        public string Cough { get; set; }

        public string Taste { get; set; }

        public string Contact { get; set; }

        public string Other { get; set; }

    }
}
