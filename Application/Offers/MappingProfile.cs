using Application.Companies;
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
            CreateMap<Resume, ApplicantDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.JobSeeker.UserId))
                .ForMember(d => d.FirstName, o => o.MapFrom(s => s.JobSeeker.FirstName))
                .ForMember(d => d.LastName, o => o.MapFrom(s => s.JobSeeker.LastName))
                .ForMember(d => d.OfferId, o => o.MapFrom(s => s.Offer.Id));
        }
    }
}