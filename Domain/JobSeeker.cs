using System;
using System.Collections.Generic;

namespace Domain
{
    public class JobSeeker
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Bio { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime LastUpdated { get; set; }

        public string UserId { get; set; } 
        public virtual AppUser User { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
        public virtual ICollection<SavedOffer> SavedOffers { get; set; }
    }
}