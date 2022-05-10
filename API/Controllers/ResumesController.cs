using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Errors;
using Application.Resumes;
using Application.User;
using Application.Offers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class ResumesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ApplicantDto>>> List()
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "Company")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to view resumes");
                
            return await Mediator.Send(new Application.Resumes.List.Query{Id = user.Id});
        }

        [HttpGet("q")]
        public async Task<ActionResult<ApplicantDto>> Details(string id, Guid offerId)
        {
            UserDto user = await GetCurrentUser();
            ApplicantDto resume = await Mediator.Send(new Application.Resumes.Details.Query{JobSeeker = id, Offer = offerId});
            OfferPublisherDto offer = await Mediator.Send(new Application.Offers.Details.Query{Id = resume.Offer.Id});

            if (offer.Company.Id != user.Id && user.Role != "Admin")
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to view this resume");
            
            return resume;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Application.Resumes.Create.Command command)
        {
            UserDto user = await GetCurrentUser();
            if (user.Role != "JobSeeker" || user.Id != command.JobSeekerId)
                throw new RestException(System.Net.HttpStatusCode.Forbidden, "You don't have premission to complete this action");
                
            return await Mediator.Send(command);
        }
    }
}