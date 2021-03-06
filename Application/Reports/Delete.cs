using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Reports
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
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
                var report = await _context.Reports.FindAsync(request.UserId, request.OfferId);

                if (report == null)
                    throw new Exception("Report could not be found");

                _context.Remove(report);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}