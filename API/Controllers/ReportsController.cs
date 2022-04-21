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
                throw new RestException(System.Net.HttpStatusCode.Unauthorized, "You don't have premission to complete this action");
                
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> Details(Guid id)
        {
            UserDto user = await GetUser();
            Report report = await Mediator.Send(new Details.Query{Id = id});

            if (user.Id != report.UserId || user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Unauthorized, "You don't have premission to complete this action");

            return report;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            UserDto user = await GetUser();
            if (user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Unauthorized, "You don't have premission to complete this action");

            return await Mediator.Send(new Application.Reports.Delete.Command{Id = id});
        }
    }
}