using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.Offers;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{   
    public class OffersController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<OfferPublisherDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<OfferPublisherDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            UserDto user = await GetCurrentUser();

            if (user.Role != "Company")
                throw new RestException(HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            command.CompanyId = user.Id;
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Application.Offers.Edit.Command command)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role == "Company")
            {
                OfferPublisherDto offer = await Mediator.Send(new Details.Query{Id = id});
                if (offer.Company.Id == user.Id)
                {
                    command.Id = id;
                    return await Mediator.Send(command);
                }
            }
            throw new RestException(HttpStatusCode.Forbidden, "You are not the offer publisher");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            UserDto user = await GetCurrentUser();
            OfferPublisherDto offer = await Mediator.Send(new Details.Query{Id = id});
            if (user.Id != offer.Company.Id && user.Role != "Admin")
                throw new RestException(HttpStatusCode.Forbidden, "You are not the offer publisher");

            return await Mediator.Send(new Application.Offers.Delete.Command{Id = id});
        }
    }
}