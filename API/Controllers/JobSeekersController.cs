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
        public async Task<ActionResult<JobSeeker>> Details(string id)
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
            UserDto user = await GetUser();
            if (user.Id != id)
                throw new RestException(System.Net.HttpStatusCode.Unauthorized, "You don't have premission to complete this action");
                
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}