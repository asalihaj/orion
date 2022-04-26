using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reports
{
    public class Details
    {
        public class Query : IRequest<List<ReportDto>>
        {
            public Guid OfferId { get; set; }
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
                List<Report> reports = await _context.Reports.ToListAsync();

                if (reports == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {resume = "Not found"});

                List<Report> reportList = new List<Report>();

                foreach (var report in reports) 
                {
                    if (report.OfferId == request.OfferId)
                        reportList.Add(report);
                }

                var reportToReturn = _mapper.Map<List<Report>, List<ReportDto>>(reportList);

                return reportToReturn;
            }
        }
    }
}