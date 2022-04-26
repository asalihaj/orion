using System.Collections.Generic;
using Application.Offers;
using Newtonsoft.Json;

namespace Application.JobSeekers
{
    public class JSProfileDto : JobSeekerDto
    {
        [JsonProperty("saved")]
        public ICollection<OfferPublisherDto> SavedOffers { get; set; }
    }
}