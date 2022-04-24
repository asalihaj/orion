using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.JobSeekers
{
    public class Save
    {
        public class Command : IRequest
        {
            public string JobSeekerId { get; set; }
            public Guid OfferId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.JobSeekerId).NotEmpty();
                RuleFor(x => x.OfferId).NotEmpty();
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
                var saved = await _context.SavedOffers.FindAsync(request.JobSeekerId, request.OfferId);

                if (saved != null) 
                    throw new RestException(HttpStatusCode.NotAcceptable, "Offer already saved");

                var saveOffer = new SavedOffer
                {
                    JobSeekerId = request.JobSeekerId,
                    OfferId = request.OfferId,
                    LastUpdated = DateTime.Now
                };

                _context.SavedOffers.Add(saveOffer);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}