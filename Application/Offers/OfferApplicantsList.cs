using System.Collections.Generic;
using Application.Resumes;
using Newtonsoft.Json;

namespace Application.Offers
{
    public class OfferApplicantsList : OfferDto
    {
        [JsonProperty("applicantList")]
        public ICollection<ResumeDto> Resumes { get; set; }
    }
}