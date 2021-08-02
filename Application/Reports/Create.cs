using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reports
{
    public class Create
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public Offer Offer { get; set; }
            public string Category { get; set; }
            public DateTime LastUpdated { get; set; }
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
                var report = new Report
                {
                    UserId = request.UserId,
                    Offer = request.Offer,
                    Category = request.Category,
                    LastUpdated = request.LastUpdated
                };

                _context.Reports.Add(report);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}