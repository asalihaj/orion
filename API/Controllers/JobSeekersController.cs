using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.JobSeekers;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   
    public class JobSeekersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<JobSeekerDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<JobSeekerDto>> Details(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, Edit.Command command)
        {
            UserDto user = await GetCurrentUser();
            if (user.Id != id)
                throw new RestException(System.Net.HttpStatusCode.Forbidden, 
                    "You don't have premission to complete this action");
                
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost("save")]
        public async Task<ActionResult<Unit>> SaveOffer(Guid offerId)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "JobSeeker")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, 
                    "You don't have premission to save offers");
            
            return await Mediator.Send(new Save.Command
            {
                JobSeekerId = user.Id, 
                OfferId = offerId
            });
        }

        [HttpDelete("remove")]
        public async Task<ActionResult<Unit>> RemoveOffer(Guid offerId)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "JobSeeker")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, 
                    "You don't have premission to save offers");
            
            return await Mediator.Send(new Remove.Command
            {
                JobSeekerId = user.Id, 
                OfferId = offerId
            });
        }
    }
}