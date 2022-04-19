using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.JobSeekers
{
    public class List
    {
        public class Query : IRequest<List<JobSeekerDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<JobSeekerDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }
            public async Task<List<JobSeekerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var jobSeekers = await _context.JobSeekers.ToListAsync(); 

                return _mapper.Map<List<JobSeeker>, List<JobSeekerDto>>(jobSeekers);
            }
        }
    }
}