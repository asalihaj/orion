using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<UserDto> { }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(
                UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator,
                IUserAccessor userAccessor,
                IMapper mapper
                )
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _mapper = mapper;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());
                
                var user = _mapper.Map<AppUser, UserDto>(appUser);      

                var profile = _userAccessor.GetProfile(user.Id, false);
                
                var userRole = await _userManager.GetRolesAsync(appUser);
                var role = userRole[0];
                    
                return new UserDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Token = _jwtGenerator.CreateToken(appUser),
                    Photo = appUser.Photo != null ? appUser.Photo.Url : null,
                    Email = user.Email,
                    Role = role,
                    Profile = profile
                };
            }
        }
    }
}