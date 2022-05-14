using System.Collections.Generic;
using Application.Reports;
using Newtonsoft.Json;

namespace Application.Offers
{
    public class OfferReportsDto : OfferPublisherDto
    {
        [JsonProperty("reporters")]
        public ICollection<ReportDto> Reports { get; set; }
    }
}