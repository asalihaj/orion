using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobSeekers
{
    public class List
    {
        public class Query : IRequest<List<JobSeeker>>
        {

        }

        public class Handler : IRequestHandler<Query, List<JobSeeker>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }
            public async Task<List<JobSeeker>> Handle(Query request, CancellationToken cancellationToken)
            {
                var JobSeekers = await _context.JobSeekers.ToListAsync(); 

                return JobSeekers;
            }
        }
    }
}