using System;
using System.Collections.Generic;
using Application.Offers;
using Application.User;

namespace Application.Reports
{
    public class ReportDto
    {
        public string Username { get; set;}
        public string Category { get; set;}
        public string LastUpdated { get; set; }
    }
}