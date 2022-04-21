using System;

namespace Application.Offers
{
    public class ApplicantDto
    {
        public Guid Id { get; set; }
        public Guid OfferId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CV { get; set; }
        public string LastUpdated { get; set; }
    }
}