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

        [HttpGet("{id}")]
        public async Task<ActionResult<List<ReportDto>>> Details(Guid id)
        {
            UserDto user = await GetUser();
            List<ReportDto> report = await Mediator.Send(new Details.Query{OfferId = id});

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