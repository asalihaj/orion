using Application.User;

namespace Application.Contacts
{
    public class ContactDto
    {
        public string UserId { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string DateCreated { get; set; }
    }
}