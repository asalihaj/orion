using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string UserId { get; set; }
            public string Name { get; set; }
            public string Location { get; set; }
           public string Description { get; set; }
            public DateTime? LastUpdated { get; set; }
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
                var company = await _context.Companies.FindAsync(request.UserId);

                if (company == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new {company = "Not found"});
                     
                company.Name = request.Name ?? company.Name;
                company.Location = request.Location ?? company.Location;
                company.Description = request.Description ?? company.Description;
                company.LastUpdated = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}