using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.JobSeekers
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Gender { get; set; }
            public string Bio { get; set; }
            public DateTime Birthday { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Gender).NotEmpty();
                RuleFor(x => x.Birthday).NotEmpty();
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
                var jobSeekers = new JobSeeker
                {
                    UserId = request.Id,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Gender = request.Gender,
                    Bio = request.Bio,
                    Birthday = request.Birthday,
                    LastUpdated = DateTime.Now
                };

                _context.JobSeekers.Add(jobSeekers);
                var success = await _context.SaveChangesAsync() > 0;

                var user  = await _userManager.FindByIdAsync(request.Id);
                await _userManager.AddToRoleAsync(user, "JobSeeker");

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}