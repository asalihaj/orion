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
            CreateMap<Photo, UserDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.UserId));
            CreateMap<AppUser, UserProfileDto>();
            CreateMap<Photo, UserProfileDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));
        }
    }
}