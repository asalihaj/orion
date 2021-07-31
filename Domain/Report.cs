using System;

namespace Domain
{
    public class Report
    {
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public Guid OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public string Category { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}