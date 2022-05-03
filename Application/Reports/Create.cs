using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
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
            public Guid OfferId { get; set; }
            public string Category { get; set; }
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
                var checkReport = await _context.Reports.FindAsync(request.UserId ,request.OfferId);

                if(checkReport != null)
                    throw new RestException(HttpStatusCode.NotAcceptable, "You already reported this offer");

                var report = new Report
                {
                    UserId = request.UserId,
                    OfferId = request.OfferId,
                    Category = request.Category,
                    LastUpdated = DateTime.Now
                };

                _context.Reports.Add(report);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}