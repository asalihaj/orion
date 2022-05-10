using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class GetUser
    {
        public class Query : IRequest<UserProfileDto>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, UserProfileDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(
                UserManager<AppUser> userManager,
                DataContext context, 
                IMapper mapper, 
                IJwtGenerator jwtGenerator,
                IUserAccessor userAccessor
                )
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<UserProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Where(x => x.UserName == request.Username).FirstOrDefaultAsync();

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound,
                     new {user = "User not found"});
                
                var userRole = _userManager.GetRolesAsync(user).Result[0];
                var profile = _userAccessor.GetProfile(user.Id, true);
                var photo = await _context.Photos.FindAsync(user.Id);
                return new UserProfileDto 
                {
                    Profile = profile,
                    Username = user.UserName,
                    Photo = photo != null ? photo.Url : null,
                    Role = userRole
                };
            }
        }
    }
}