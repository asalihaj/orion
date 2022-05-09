using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var photo = await _context.Photos.SingleOrDefaultAsync(x => x.UserId == request.Id);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photo = "Not found"});

                var result = await _photoAccessor.DeletePhoto(photo.Name);

                if (result == null)
                    throw new Exception("Problem deleting photo");

                
                _context.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) 
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}