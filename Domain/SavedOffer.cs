using System;

namespace Domain
{
    public class SavedOffer
    {
        public string UserId { get; set; }
        public virtual JobSeeker User { get; set; }
        public Guid OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}