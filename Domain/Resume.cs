using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Resume
    {
        public Guid OfferId { get; set; }
        public virtual Offer Offer { get; set; }
        public string JobSeekerId { get; set; }
        public virtual JobSeeker JobSeeker { get; set; }
        public string CV { get; set; }
        public string Name { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}