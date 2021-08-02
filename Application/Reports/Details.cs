using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reports
{
    public class Details
    {
        public class Query : IRequest<Report>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Report>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Report> Handle(Query request, CancellationToken cancellationToken)
            {
                var report = await _context.Reports.FindAsync(request.Id);

                return report;
            }
        }
    }
}