using System;
using System.IO;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using Dropbox.Api;
using Dropbox.Api.Files;
using Infrastructure.Dropbox;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {

        private readonly DropboxClient _dropbox;
        public PhotoAccessor(IOptions<DropboxSettings> config)
        {
            _dropbox = new DropboxClient(config.Value.AccessToken);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file, string id) 
        {
            var ext = Path.GetExtension(file.FileName);
            if(file.Length > 0) 
            {
                using (var stream = file.OpenReadStream())
                {
                    var result = await _dropbox.Files.UploadAsync(
                        "/photos/" + id + ".png",
                        WriteMode.Overwrite.Instance,
                        body: stream);
                }
            }
            
            var photo = await _dropbox.Sharing.ListSharedLinksAsync("/photos/" + id + ".png");

            if (photo.Links.Count == 0)
            {
                var link = await _dropbox.Sharing.CreateSharedLinkWithSettingsAsync("/photos/" + id + ".png");
                return new PhotoUploadResult
                {
                    PhotoId = id + ".png",
                    Url = link.Url + "&raw=1",
                    Name = id + ext
                };
            } else 
            {
                return new PhotoUploadResult
                {
                    PhotoId = id + ".png",
                    Url = photo.Links[0].Url + "&raw=1",
                    Name = id + ext
                };
            }
        }

        public async Task<string> DeletePhoto(string photoId)
        {
            var deleteParams = await _dropbox.Files.DeleteV2Async("/photos/" + photoId);
            return deleteParams != null ? "ok" : null;
        }
    }
}