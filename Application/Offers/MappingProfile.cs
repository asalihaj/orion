using Application.User;
using AutoMapper;
using Domain;

namespace Application.Offers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Offer, OfferDto>();
            CreateMap<Company, CompanyDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName))
                .ForMember(d => d.Id, o => o.MapFrom(s => s.UserId));
            CreateMap<Resume, ApplicantDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.JobSeeker.UserId))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.JobSeeker.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.JobSeeker.LastName));
            CreateMap<Report, ReportDto>()
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Offer.Title))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.User.UserName));
        }
    }
}