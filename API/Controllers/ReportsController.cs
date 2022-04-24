using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
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
            UserDto user = await GetUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");
                
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("q")]
        public async Task<ActionResult<ReportDto>> Details(string userId, Guid offerId)
        {
            UserDto user = await GetUser();
            ReportDto report = await Mediator.Send(new Details.Query{UserId = userId, OfferId = offerId});

            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            return report;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<Unit>> Delete(string userId, Guid offerId)
        {
            UserDto user = await GetUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");

            return await Mediator.Send(new Application.Reports.Delete.Command{UserId = userId, OfferId = offerId});
        }
    }
}