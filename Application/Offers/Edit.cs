using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Offers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Location { get; set; }
            public string Category { get; set; }
            public string Schedule { get; set; }
            public double? Salary { get; set; }
            public DateTime? ExpDate { get; set; }
            public string Description { get; set; }
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
                    throw new RestException(HttpStatusCode.NotFound, 
                    new { offer = "Not found" });

                offer.Title = request.Title ?? offer.Title;
                offer.Location = request.Location ?? offer.Location;
                offer.Category = request.Category ?? offer.Category;
                offer.Schedule = request.Schedule ?? offer.Schedule;
                offer.Salary = request.Salary ?? offer.Salary;
                offer.ExpDate = request.ExpDate ?? offer.ExpDate;
                offer.Description = request.Description ?? offer.Description;
                offer.LastUpdated = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}