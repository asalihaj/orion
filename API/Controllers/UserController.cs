using System.Threading.Tasks;
using Application.Errors;
using Application.User;
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
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            UserDto user = await Mediator.Send(new CurrentUser.Query());
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Unauthorized, "You don't have premission");
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}