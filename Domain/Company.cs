using System;
using System.Collections.Generic;

namespace Domain
{
    public class Company
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string Logo {get; set;}
        public DateTime LastUpdated { get; set; }

        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public virtual ICollection<Offer> Offers { get; set; }
    }
}