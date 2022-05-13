using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Contacts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string UserId { get; set; }
            public string Email { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Title).NotEmpty();
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
                var contact = new Contact
                {
                    Id = new Guid(),
                    UserId = request.UserId,
                    Email = request.Email,
                    Title = request.Title,
                    Description = request.Description,
                    DateCreated = DateTime.Now
                };

                _context.Contacts.Add(contact);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}