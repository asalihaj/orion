using Application.User;
using AutoMapper;
using Domain;

namespace Application.Companies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Company, CompanyDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.UserId))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
                .ForMember(d => d.Url, o => o.MapFrom(s => s.User.Photo.Url));
            
        }
    }
}