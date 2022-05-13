using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Resumes;
using Dropbox.Api;
using Dropbox.Api.Files;
using Infrastructure.Dropbox;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Resumes
{
    public class ResumeAccessor : IResumeAccessor
    {
        private readonly DropboxClient _dropbox;
        public ResumeAccessor(IOptions<DropboxSettings> config)
        {
            _dropbox = new DropboxClient(config.Value.AccessToken);
        }

        public async Task<ResumeUploadResult> AddResume(IFormFile file, string offerId, string fileName)
        {
            var ext = Path.GetExtension(file.FileName);

            var path = "/offers/" + offerId + "/" + fileName + ext;

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var result = await _dropbox.Files.UploadAsync(
                        path,
                        WriteMode.Overwrite.Instance,
                        body: stream);
                }
            }

            var resume = await _dropbox.Sharing.ListSharedLinksAsync(path);

            if (resume.Links.Count == 0)
            {
                var link = await _dropbox.Sharing.CreateSharedLinkWithSettingsAsync(path);
                
                var downloadLink = link.Url.Replace("dl=0", "dl=1");
                return new ResumeUploadResult 
                {
                    ResumeId = fileName + ext,
                    CV = downloadLink,
                    Name = fileName + ext
                };
            } else 
            {
                return new ResumeUploadResult
                {
                    ResumeId = fileName + ext,
                    CV = resume.Links[0].Url.Replace("dl=0", "dl=1"),
                    Name = fileName + ext
                };
            }
        }

        public async Task<string> GetDownloadLink(string offerId)
        {
            var offerResumes = await _dropbox.Sharing.ListSharedLinksAsync("/offers/" + offerId);

            if (offerResumes.Links.Count == 0)
            {
                var link = await _dropbox.Sharing.CreateSharedLinkWithSettingsAsync("/offers/" + offerId);
                
                var linkResult = link.Url.Replace("dl=0", "dl=1");

                return linkResult;
            }

            var result = offerResumes.Links[0].Url.Replace("dl=0", "dl=1");

            return result;
        }
    }
}