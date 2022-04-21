using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Offers;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Resumes
{
    public class Details
    {
        public class Query : IRequest<ApplicantDto>
        {
            public string JobSeeker { get; set; }
            public Guid Offer { get; set; }
        }

        public class Handler : IRequestHandler<Query, ApplicantDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ApplicantDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var resume = await _context.Resumes.FindAsync(request.Offer, request.JobSeeker);

                if (resume == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {resume = "Not found"});

                var resumeToReturn = _mapper.Map<Resume, ApplicantDto>(resume);

                return resumeToReturn;
            }
        }
    }
}