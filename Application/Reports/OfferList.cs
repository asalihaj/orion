using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Offers;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Reports
{
    public class OfferList
    {
        public class Query : IRequest<List<OfferReportsDto>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<OfferReportsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<OfferReportsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var offers = await _context.Offers.ToListAsync();

                var offerList = _mapper.Map<List<Offer>, List<OfferReportsDto>>(offers);

                var reports = await _context.Resumes.ToListAsync();

                return offerList;
            }
        }
    }
}