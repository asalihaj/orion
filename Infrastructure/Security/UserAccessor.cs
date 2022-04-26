using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Companies;
using Application.Errors;
using Application.Interfaces;
using Application.JobSeekers;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper; 
        private readonly UserManager<AppUser> _userManager;
        public UserAccessor(IHttpContextAccessor httpContextAccessor, DataContext context, IMapper mapper, UserManager<AppUser> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
        }

        public string GetCurrentUsername()
        {
            var username = _httpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return username;
        }

        public string GetRole(string id)
        {
            var user = _context.Users.SingleOrDefault(x => x.Id == id);
            if (user == null)
                throw new RestException(HttpStatusCode.BadRequest, new {error = "This user does not exist!"});

            var userRole = _context.UserRoles.SingleOrDefault(x => x.UserId == id);

            if (userRole == null)
                throw new RestException(HttpStatusCode.NotFound, new {error = "This user does not have a role!"});

            var roleName = _context.Roles.SingleOrDefault(x => x.Id == userRole.RoleId).Name;

            if (roleName == null)
                throw new RestException(HttpStatusCode.NotFound, new {error = "This role does not exist!"});

            return roleName;
        }

        public dynamic GetProfile(string Id)
        {
            var user = _context.Users.SingleOrDefault(x => x.Id == Id);
            var role = _context.UserRoles.SingleOrDefault(x => x.UserId == user.Id).RoleId;
            var userRole = _context.Roles.SingleOrDefault(x => x.Id == role).Name;

            if (userRole == "Admin") 
            {
                return null;
            }
            
            var company = _context.Companies.SingleOrDefault(x => x.UserId == Id);
            if (company == null)
            {
                var jobSeeker = _context.JobSeekers.SingleOrDefault(x => x.UserId == Id);

                if (jobSeeker == null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new {error = "User is not registered as a company or jobseeker"});
                
                var jsProfile = _mapper.Map<JobSeeker, JSProfileDto>(jobSeeker);

                return jsProfile;
            }
            var companyProfile = _mapper.Map<Company, CompanyDto>(company);

            return companyProfile;
        }
    }
}