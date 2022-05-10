using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Offers;
using Application.Reports;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReportsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ReportDto>>> List()
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");
                
            return await Mediator.Send(new Application.Reports.List.Query());
        }

        [HttpGet("q")]
        public async Task<ActionResult<ReportDto>> Details(Guid offerId, string username)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            ReportDto report = await Mediator.Send(new Application.Reports.Details.Query{OfferId = offerId, Username = username});

            return report;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Application.Reports.Create.Command command)
        {
            UserDto user = await GetCurrentUser();

            OfferPublisherDto offer = await Mediator.Send(new Application.Offers.Details.Query{Id = command.OfferId});
            if(user.Id == offer.Company.Id)
                throw new RestException(HttpStatusCode.Forbidden, "You can't report your own offer");
            
            command.UserId = user.Id;
            return await Mediator.Send(command);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<Unit>> Delete(string userId, Guid offerId)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            return await Mediator.Send(new Application.Reports.Delete.Command{UserId = userId, OfferId = offerId});
        }
    }
}