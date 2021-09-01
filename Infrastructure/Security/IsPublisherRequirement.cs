using System;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.Security
{
    public class IsPublisherRequirement : IAuthorizationRequirement
    {
    }

    public class IsPublisherRequirementHandler : AuthorizationHandler<IsPublisherRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        public IsPublisherRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsPublisherRequirement requirement)
        {
            if(context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?
                    .Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                var user = _context.Users.SingleOrDefault(x => x.UserName == currentUserName);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized, new {auth = "Please log in to edit or delete the offer"});

                var company = _context.Companies.FindAsync(user.Id).Result;

                if (company == null)
                    throw new RestException(HttpStatusCode.Forbidden, new {auth = "You don't have premission to edit offers"});

                var offerId = Guid.Parse(authContext.RouteData.Values["id"].ToString());

                var offer = _context.Offers.FindAsync(offerId).Result;

                if (offer == null)
                    throw new RestException(HttpStatusCode.BadRequest, new {offer = "Could not find offer"});

                var publisher = offer.CompanyId;

                if (publisher != company.UserId)
                    throw new RestException(HttpStatusCode.Forbidden, new {auth = "You are not the publisher of this offer"});

                if (publisher == company.UserId)
                    context.Succeed(requirement);
            } else {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}