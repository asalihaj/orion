using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Offers
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string CompanyId { get; set; }
            public string Title { get; set; }
            public string Category { get; set; }
            public string Location { get; set; }
            public string Schedule { get; set; }
            public double Salary { get; set; }
            public DateTime ExpDate { get; set; }
            public string Description { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Id).NotEmpty();
                RuleFor(x => x.Location).NotEmpty();
                RuleFor(x => x.Schedule).NotEmpty();
                RuleFor(x => x.Salary).NotEmpty();
                RuleFor(x => x.ExpDate).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var offer = new Offer
                {
                    Id = request.Id,
                    CompanyId = request.CompanyId,
                    Title = request.Title,
                    Category = request.Category,
                    Location = request.Location,
                    Schedule = request.Schedule,
                    Salary = request.Salary,
                    ExpDate = request.ExpDate,
                    DateCreated = DateTime.Now,
                    Description = request.Description,
                    LastUpdated = DateTime.Now
                };

                _context.Offers.Add(offer);

                var user = await _context.Users.SingleOrDefaultAsync( x => 
                    x.UserName == _userAccessor.GetCurrentUsername());
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}