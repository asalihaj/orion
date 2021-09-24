using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Offers
{
    public class List
    {
        public class Query : IRequest<List<OfferDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<OfferDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<OfferDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var offers = await _context.Offers.ToListAsync();

                var offerList = _mapper.Map<List<Offer>, List<OfferDto>>(offers);

                var resumes = await _context.Resumes.ToListAsync();

                offerList.ForEach(o => {
                    o.Applicants = resumes.FindAll(x => x.OfferId == o.Id).Count;
                });

                return offerList;
            }
        }
    }
}