using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.Offers;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{   
    public class OffersController : BaseController
    {
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<OfferDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<OfferDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            UserDto user = await GetUser();
            if (user.Role == "Company")
            {
                OfferDto offer = await Mediator.Send(new Details.Query{Id = id});
                if (offer.Company.Id == user.Id)
                {
                    command.Id = id;
                    return await Mediator.Send(command);
                }
            }
            throw new RestException(System.Net.HttpStatusCode.Forbidden, "You are not the offer publisher");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            UserDto user = await GetUser();
            OfferDto offer = await Mediator.Send(new Details.Query{Id = id});
            if (user.Id != offer.Company.Id)
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You are not the offer publisher");

            return await Mediator.Send(new Application.Offers.Delete.Command{Id = id});
        }
    }
}