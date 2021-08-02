using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Offers
{
    public class Details
    {
        public class Query : IRequest<OfferDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, OfferDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<OfferDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var offer = await _context.Offers.FindAsync(request.Id);

                if (offer == null)
                    throw new RestException(HttpStatusCode.NotFound, 
                    new { offer = "Not found" });

                var offerToReturn = _mapper.Map<Offer, OfferDto>(offer);

                return offerToReturn;
            }
        }
    }
}