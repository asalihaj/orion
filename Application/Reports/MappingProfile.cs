using Application.Offers;
using Application.User;
using AutoMapper;
using Domain;

namespace Application.Reports
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Report, ReportDto>()
                .ForMember(x => x.Username, o => o.MapFrom(s => s.User.UserName));
        }
    }
}