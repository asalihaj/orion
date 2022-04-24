using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.JobSeekers
{
    public class Remove
    {
         public class Command : IRequest
        {
            public string JobSeekerId { get; set; }
            public Guid OfferId { get; set; }
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
                var savedOffer = await _context.SavedOffers.FindAsync(request.JobSeekerId, request.OfferId);

                if (savedOffer == null)
                    throw new RestException(System.Net.HttpStatusCode.NoContent, 
                    new {offer = "Offer is not saved"});

                _context.Remove(savedOffer);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}