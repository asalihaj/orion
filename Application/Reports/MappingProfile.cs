using AutoMapper;
using Domain;

namespace Application.Reports
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Report, ReportDto>()
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Offer.Title))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));
        }
    }
}