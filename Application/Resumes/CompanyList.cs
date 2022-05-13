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

namespace Application.Resumes
{
    public class CompanyList
    {
        public class Query : IRequest<List<OfferApplicantsList>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<OfferApplicantsList>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }
            public async Task<List<OfferApplicantsList>> Handle(Query request, CancellationToken cancellationToken)
            {
                var offers = await _context.Offers.Where(x => x.CompanyId == request.Id).ToListAsync();

                var offerList = _mapper.Map<List<Offer>, List<OfferApplicantsList>>(offers);

                var resumes = await _context.Resumes.ToListAsync();

                offerList.ForEach(o => {
                    o.Applicants = resumes.FindAll(x => x.OfferId == o.Id).Count;
                });

                return offerList;
            }
        }
    }
}