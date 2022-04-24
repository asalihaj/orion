using System;

namespace Domain
{
    public class SavedOffer
    {
        public string JobSeekerId { get; set; }
        public virtual JobSeeker JobSeeker { get; set; }
        public Guid OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}