using System.Threading.Tasks;
using Application.Errors;
using Application.User;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? (_mediator = 
        HttpContext.RequestServices.GetService<IMediator>());

        protected async Task<UserDto> GetUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}