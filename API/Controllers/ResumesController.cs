using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Resumes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ResumesController : BaseController
    {
        [HttpGet]
        [Authorize(Roles = "Company")]
        public async Task<ActionResult<List<Resume>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Company")]
        public async Task<ActionResult<Resume>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        [Authorize(Roles = "JobSeeker")]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}