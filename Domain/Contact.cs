using System;

namespace Domain
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } 
        public DateTime DateCreated { get; set; }
    }
}