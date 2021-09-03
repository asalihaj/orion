using System.Linq;
using System.Net;
using System.Security.Claims;
using Application.Companies;
using Application.Errors;
using Application.Interfaces;
using Application.JobSeekers;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper; 
        public UserAccessor(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
        }

        public string GetCurrentUsername()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }

        public dynamic GetProfile(string Id)
        {
            var company = _context.Companies.SingleOrDefault(x => x.UserId == Id);
            if (company == null)
            {
                var jobSeeker = _context.JobSeekers.SingleOrDefault(x => x.UserId == Id);

                if (jobSeeker == null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new {error = "User is not registered as a company or jobseeker"});
                
                var jsProfile = _mapper.Map<JobSeeker, JobSeekerDto>(jobSeeker);

                return jsProfile;
            }
            var companyProfile = _mapper.Map<Company, CompanyDto>(company);

            return companyProfile;
        }
    }
}