using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Companies;
using Domain;
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
            command.UserId = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}