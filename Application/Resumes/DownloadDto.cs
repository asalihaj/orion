using Application.JobSeekers;
using Application.Offers;
using Newtonsoft.Json;

namespace Application.Resumes
{
    public class DownloadDto
    {
        public string OfferId { get; set; }
        public string Url { get; set; }
    }
}