using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.User;
using MediatR;
using System.Net;
using Persistence;

namespace Application.Offers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var offer = await _context.Offers.FindAsync(request.Id);

                if (offer == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {offer = "Not found"});

                _context.Remove(offer);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}