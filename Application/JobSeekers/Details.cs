using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.JobSeekers
{
    public class Details
    {
        public class Query : IRequest<JobSeeker>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, JobSeeker>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<JobSeeker> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobSeeker = await _context.JobSeekers.FindAsync(request.Id);

                if (jobSeeker == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new { jobseeker = "Not found" });

                return jobSeeker;
            }
        }
    }
}