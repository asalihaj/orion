using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.Resumes;
using Application.User;
using Application.Offers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ResumesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ApplicantDto>>> List()
        {
            return await Mediator.Send(new Application.Resumes.List.Query());
        }

        [HttpGet("q")]
        public async Task<ActionResult<ApplicantDto>> Details(string id, Guid offerId)
        {
            UserDto user = await GetUser();
            ApplicantDto resume = await Mediator.Send(new Application.Resumes.Details.Query{JobSeeker = id, Offer = offerId});
            OfferDto offer = await Mediator.Send(new Application.Offers.Details.Query{Id = resume.OfferId});

            if (offer.Company.Id != user.Id && user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to view this resume");
            
            return resume;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Application.Resumes.Create.Command command)
        {
            UserDto user = await GetUser();
            if (user.Role != "JobSeeker")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You need to be a JobSeeker to apply to this offer");
            return await Mediator.Send(command);
        }
    }
}