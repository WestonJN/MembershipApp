using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MembershipApp.Models
{
    public class Member
    {
        public int MemberId { get; set; }

        public string MemberFullName { get; set; }

        public  string Department { get; set; }
        public string CellNumber { get; set; }

        public string DateOfBirth { get; set; }

        public string DateOfBaptism { get; set; }

        public string ResidentialAddress { get; set; }
    

    }
}
