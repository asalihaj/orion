using System;
using System.Collections.Generic;
using Application.Companies;
using Newtonsoft.Json;

namespace Application.Offers
{
    public class OfferPublisherDto : OfferDto
    {
        [JsonProperty("publisher")]
        public CompanyDto Company { get; set; }
    }
}