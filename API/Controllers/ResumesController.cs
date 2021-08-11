using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Resumes;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ResumesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Resume>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Resume>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}