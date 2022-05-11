using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.JobSeekers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Gender { get; set; }
            public string Bio { get; set; }
            public DateTime? Birthday { get; set; }
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
                var jobSeekers = await _context.JobSeekers.FindAsync(request.Id);

                if (jobSeekers == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new { jobseeker = "Not found" });
                     
                jobSeekers.FirstName = request.FirstName ?? jobSeekers.FirstName;
                jobSeekers.LastName = request.LastName ?? jobSeekers.LastName;
                jobSeekers.Gender = request.Gender ?? jobSeekers.Gender;
                jobSeekers.Bio = request.Bio ?? jobSeekers.Bio;
                jobSeekers.Birthday = request.Birthday ?? jobSeekers.Birthday;
                jobSeekers.LastUpdated = DateTime.Now;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}