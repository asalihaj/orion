using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Contacts;
using Application.Errors;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ContactsController : BaseController
    {
        
        [HttpGet]
        public async Task<ActionResult<List<Contact>>> List()
        {
            UserDto user = await GetCurrentUser();
            if (user.Id != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");
                
            return await Mediator.Send(new List.Query());
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> Details(Guid id)
        {
            UserDto user = await GetCurrentUser();
            if (user.Id != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}