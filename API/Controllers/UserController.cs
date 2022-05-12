using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<ActionResult<UserProfileDto>> GetUser(string username)
        {
            return await Mediator.Send(new GetUser.Query{Username = username});
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(string id, Edit.Command command)
        {
            UserDto user = await GetCurrentUser();
                        
            if (user.Id != id)
                throw new RestException(HttpStatusCode.Forbidden, "You don't have permission to edit this account");
                
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            UserDto user = await GetCurrentUser();
            if (user.Id != id && user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have permission to delete this account");

            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}