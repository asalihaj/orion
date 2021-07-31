using System;
using System.Collections.Generic;

namespace Domain
{
    public class Offer
    {
        public Guid Id { get; set; }
        public string CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public string Schedule { get; set; }
        public double Salary { get; set; }
        public DateTime ExpDate { get; set; }
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime LastUpdated { get; set; }

        public virtual ICollection<SavedOffer> SavedOffers { get; set; }
        public virtual ICollection<Report> Reports { get; set; }
        public virtual ICollection<Resume> Resumes { get; set; }
    }
}