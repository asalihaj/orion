using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reports
{
    public class List
    {
        public class Query : IRequest<List<ReportDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<ReportDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;

            }
            public async Task<List<ReportDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var reports = await _context.Reports.ToListAsync(); 

                return _mapper.Map<List<Report>, List<ReportDto>>(reports);
            }
        }
    } 
}