using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Companies
{
    public class Create
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public string Name { get; set; }
            public string Location { get; set; }
            public string Description { get; set; }
        }
               public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = new Company
                {
                    UserId = request.UserId,
                    Name = request.Name,
                    Location = request.Location,
                    Description = request.Description,
                    LastUpdated = DateTime.Now
                };

                _context.Companies.Add(company);
                var success = await _context.SaveChangesAsync() > 0;

                var user = await _userManager.FindByIdAsync(request.UserId);
                await _userManager.AddToRoleAsync(user, "Company");

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}