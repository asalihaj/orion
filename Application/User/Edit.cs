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
    public class Edit
    {
        public class Command : IRequest
        {
            public string Email { get; set; }
            public string Username { get; set; }
            public string Password { get; set; }
            public string NewPassword { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Username);
                RuleFor(x => x.Email).EmailAddress();
                RuleFor(x => x.Password).Password().NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;
            private readonly IJwtGenerator _jwtGenerator;
            public Handler(
                DataContext context, 
                UserManager<AppUser> userManager,
                IUserAccessor userAccessor,
                IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
                _userAccessor = userAccessor;
                _context = context;
            }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appUser = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                if (appUser == null)
                    throw new RestException(HttpStatusCode.Unauthorized, "This account does not exist");
                
                var userPassword = await _userManager.CheckPasswordAsync(appUser, request.Password);
                
                if (!userPassword)
                    throw new RestException(HttpStatusCode.Forbidden, "Your password is incorrect");

                appUser.Email = request.Email;
                appUser.UserName = request.Username;
                appUser.LastUpdated = DateTime.Now;
                var result = await _userManager.UpdateAsync(appUser);
                if (result.Succeeded)
                {
                    if (request.NewPassword != null)
                    {
                        var pwChnage = await _userManager.ChangePasswordAsync(appUser, request.Password, request.NewPassword);

                        if (pwChnage.Succeeded)
                            return Unit.Value;
                    } else {
                        return Unit.Value;
                    }
                }
                
                throw new Exception("Problem editing user");
            }
        }
    }
}