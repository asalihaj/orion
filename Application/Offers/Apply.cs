using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Offers
{
    public class Apply
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var offer = await _context.Offers.FindAsync(request.Id);

                if (offer == null)
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {Offer = "Could not find offer"});

                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var application = await _context.SavedOffers.SingleOrDefaultAsync(x => 
                    x.OfferId == offer.Id && x.JobSeekerId == user.Id);

                if (application != null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new{Attendance = "You already applied to this offer"});

                application = new SavedOffer
                {
                    Offer = offer,
                    LastUpdated = DateTime.Now
                };

                _context.SavedOffers.Add(application);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}