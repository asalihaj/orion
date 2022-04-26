using System;
using System.Collections.Generic;
using Application.Offers;
using Newtonsoft.Json;

namespace Application.JobSeekers
{
    public class JobSeekerDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public DateTime Birthday { get; set; }
    }
}