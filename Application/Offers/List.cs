using System;
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
        public class Query : IRequest<List<OfferPublisherDto>>
        {

        }

        public class Handler : IRequestHandler<Query, List<OfferPublisherDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<OfferPublisherDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var offers = await _context.Offers.ToListAsync();

                var activeOffers = new List<Offer>();

                foreach (var offer in offers)
                {
                    var active = DateTime.Compare(offer.ExpDate, DateTime.Now);
                    if (active > 0)
                    {
                        activeOffers.Add(offer);
                    }

                }

                var offerList = _mapper.Map<List<Offer>, List<OfferPublisherDto>>(activeOffers);

                var resumes = await _context.Resumes.ToListAsync();

                offerList.ForEach(o => {
                    o.Applicants = resumes.FindAll(x => x.OfferId == o.Id).Count;
                });

                return offerList;
            }
        }
    }
}