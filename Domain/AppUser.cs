using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public DateTime DateCreated { get; set; }
        public DateTime LastUpdated { get; set; }

        public virtual Company Company { get; set; }
        public virtual JobSeeker JobSeeker { get; set; }
        public virtual ICollection<SavedOffer> SavedOffers { get; set; }
        public virtual ICollection<Report> Reports { get; set; }
    }
}