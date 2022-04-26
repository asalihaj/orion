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
            public string Id { get; set; }
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
                List<Resume> resumes = await _context.Resumes.ToListAsync();

                List<Resume> companyResumes = resumes.FindAll(x => x.Offer.CompanyId == request.Id);

                var resumeList = _mapper.Map<List<Resume>, List<ApplicantDto>>(companyResumes);

                return resumeList;
            }
        }
    }
}