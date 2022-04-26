using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.JobSeekers
{
    public class Details
    {
        public class Query : IRequest<JobSeekerDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, JobSeekerDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<JobSeekerDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobSeeker = await _context.JobSeekers.FindAsync(request.Id);

                if (jobSeeker == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new { jobseeker = "Not found" });

                var jsToReturn = _mapper.Map<JobSeeker, JobSeekerDto>(jobSeeker);

                return jsToReturn;
            }
        }
    }
}