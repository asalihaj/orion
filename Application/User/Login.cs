using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Application.Errors;
using System.Net;
using Application.Interfaces;
using AutoMapper;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<UserDto>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;

            public Handler(
                UserManager<AppUser> userManager, 
                SignInManager<AppUser> signInManager,
                IJwtGenerator jwtGenerator,
                IMapper mapper)
            {
                _jwtGenerator = jwtGenerator;
                _signInManager = signInManager;
                _userManager = userManager;
                _mapper = mapper;

            }
            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByEmailAsync(request.Email);

                if (appUser == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                var user = _mapper.Map<AppUser, UserDto>(appUser);

                var result = await _signInManager.CheckPasswordSignInAsync(appUser, request.Password, false);

                if (result.Succeeded)
                {
                    //TODO: generate token
                    return new UserDto
                    {
                        Id = appUser.Id,
                        Token = _jwtGenerator.CreateToken(appUser),
                        Username = appUser.UserName,
                        Image = null,
                        SavedOffers = user.SavedOffers
                    };
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
