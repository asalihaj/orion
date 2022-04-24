using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Reports
{
    public class Details
    {
        public class Query : IRequest<ReportDto>
        {
            public string UserId { get; set; }
            public Guid OfferId { get; set; }
        }

        public class Handler : IRequestHandler<Query, ReportDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ReportDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var report = await _context.Reports.FindAsync(request.UserId, request.OfferId);

                if (report == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {resume = "Not found"});

                var reportToReturn = _mapper.Map<Report, ReportDto>(report);

                return reportToReturn;
            }
        }
    }
}