using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Companies;
using Application.Errors;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CompaniesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<CompanyDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<CompanyDto>> Details(string id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, Edit.Command command)
        {
            UserDto user = await GetCurrentUser();
            if (user.Id != id)
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            command.UserId = id;
            return await Mediator.Send(command);
        }
    }
}