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
        public class Query : IRequest<ReportDto>
        {
            public Guid OfferId { get; set; }
            public string Username { get; set; }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username);
                Report report = await _context.Reports.FindAsync(user.Id ,request.OfferId);

                if (report == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {resume = "Not found"});

                var reportToReturn = _mapper.Map<Report, ReportDto>(report);

                return reportToReturn;
            }
        }
    }
}