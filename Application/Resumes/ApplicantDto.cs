using Application.JobSeekers;
using Application.Offers;
using Newtonsoft.Json;

namespace Application.Resumes
{
    public class ApplicantDto
    {
        [JsonProperty("applicant")]
        public JobSeekerDto JobSeeker { get; set; }    
        public OfferDto Offer { get; set; }
        public string CV { get; set; }
        public string LastUpdated { get; set; }
    }
}