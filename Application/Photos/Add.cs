using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<PhotoDto>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, PhotoDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IMapper _mapper;
            public Handler(
                DataContext context, 
                IUserAccessor userAccessor, 
                IPhotoAccessor photoAccessor,
                IMapper mapper)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<PhotoDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File, user.UserName);

                var photoData = await _context.Photos.FindAsync(user.Id);
                
                var photo = new Photo
                {
                    UserId = user.Id,
                    Url = photoUploadResult.Url,
                    Name = photoUploadResult.PhotoId
                };

                if (photoData == null)
                {
                    await _context.Photos.AddAsync(photo);
                    var success = await _context.SaveChangesAsync() > 0;

                    if (!success)
                        throw new RestException(HttpStatusCode.InternalServerError, "Problem saving photo");
                }

                var photoToReturn = _mapper.Map<Photo, PhotoDto>(photo);

                return photoToReturn;
            }
        }
    }
}