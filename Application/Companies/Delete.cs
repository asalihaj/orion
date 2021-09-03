using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
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
                var company = await _context.Companies.FindAsync(request.Id);

                if (company == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new {company = "Not found"});

                _context.Remove(company);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}