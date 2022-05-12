using System.Threading.Tasks;
using Application.Resumes;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IResumeAccessor
    {
        Task<ResumeUploadResult> AddResume(IFormFile file, string offerId, string fileName);
        Task<string> GetDownloadLink(string offerId);
    }
}