using System.Linq;
using Application.Offers;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserDto>();
        }
    }
}