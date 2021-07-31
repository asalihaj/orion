using System;

namespace Domain
{
    public class Resume
    {
        public Guid OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public string JobSeekerId { get; set; }
        public virtual JobSeeker JobSeeker { get; set; }
        public string CV { get; set; }
        public DateTime Last_Updated { get; set; }
    }
}