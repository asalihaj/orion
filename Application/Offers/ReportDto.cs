using System;

namespace Application.Offers
{
    public class ReportDto
    {
        public Guid OfferId { get; set;}
        public string Title { get; set;}
        public string Username { get; set;}
        public string Category { get; set;}
    }
}