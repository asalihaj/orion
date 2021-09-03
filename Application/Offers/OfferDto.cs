using System;
using System.Collections.Generic;
using Application.Companies;
using Domain;
using Newtonsoft.Json;

namespace Application.Offers
{
    public class OfferDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public string Location { get; set; }
        public string Schedule { get; set; }
        public double Salary { get; set; }
        public DateTime ExpDate { get; set; }
        public string Description { get; set; }

        [JsonProperty("publisher")]
        public CompanyDto Company { get; set; }

        [JsonProperty("applicants")]
        public ICollection<ApplicantDto> Resumes { get; set; }

        [JsonProperty("reports")]
        public ICollection<ReportDto> Reports { get; set; }
    }
}