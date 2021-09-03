using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Details
    {
        public class Query : IRequest<CompanyDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, CompanyDto>
        {
            private readonly DataContext _context;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, IJwtGenerator jwtGenerator)
            {
                _jwtGenerator = jwtGenerator;
                _mapper = mapper;
                _context = context;

            }

            public async Task<CompanyDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var company = await _context.Companies.FindAsync(request.Id);

                if (company == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound,
                     new {company = "Not found"});

                var companyToReturn = _mapper.Map<Company, CompanyDto>(company);

                return companyToReturn;
            }
        }
    }
}