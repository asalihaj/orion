using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Offers;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Resumes
{
    public class List
    {
        public class Query : IRequest<List<ApplicantDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<ApplicantDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<ApplicantDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var resumes = await _context.Resumes.ToListAsync();

                var resumeList = _mapper.Map<List<Resume>, List<ApplicantDto>>(resumes);

                return resumeList;
            }
        }
    }
}