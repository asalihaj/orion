using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
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
            public string Logo {get; set;}
            public DateTime LastUpdated {get; set;}
        }
               public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserId).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();
                RuleFor(x => x.LastUpdated).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var company = new Company
                {
                    UserId = request.UserId,
                    Name = request.Name,
                    Location = request.Location,
                    Description = request.Description,
                    Logo = request.Logo,
                    LastUpdated = request.LastUpdated
                };

                _context.Companies.Add(company);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}