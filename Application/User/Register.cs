using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<UserDto>
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, UserDto>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _context = context;
            }

            public async Task<UserDto> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.NotAcceptable, new {Email = "Email already exists"});


                if (await _context.Users.Where(x => x.UserName == request.Username).AnyAsync())
                    throw new RestException(HttpStatusCode.NotAcceptable, new {Username = "Username already exists"});

                var user = new AppUser
                {
                    Email = request.Email,
                    UserName = request.Username,
                    DateCreated = DateTime.Now,
                    LastUpdated = DateTime.Now
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                
                if (result.Succeeded)
                {
                    return new UserDto
                    {
                        Id = user.Id,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName
                    };
                }

                throw new Exception("Problem creating user");
            }
        }
    }
}