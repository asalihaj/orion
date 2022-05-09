using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<PhotoDto>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            Application.User.UserDto user = await GetUser();

            if(user.Id != id)
                throw new RestException(HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}