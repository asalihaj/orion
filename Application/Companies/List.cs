using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class List
    {
        public class Query : IRequest<List<CompanyDto>>
        {
            
        }

        public class Handler : IRequestHandler<Query, List<CompanyDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<CompanyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var companies = await _context.Companies.ToListAsync(); 

                
                return _mapper.Map<List<Company>, List<CompanyDto>>(companies);
            }
        }
    }
}