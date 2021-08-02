using Application.Offers;
using AutoMapper;
using Domain;

namespace Application.User
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserDto>();
            CreateMap<SavedOffer, OfferDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Offer.Id))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Offer.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Offer.Category))
                .ForMember(d => d.Location, o => o.MapFrom(s => s.Offer.Location))
                .ForMember(d => d.Schedule, o => o.MapFrom(s => s.Offer.Schedule))
                .ForMember(d => d.Salary, o => o.MapFrom(s => s.Offer.Salary))
                .ForMember(d => d.ExpDate, o => o.MapFrom(s => s.Offer.ExpDate))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Offer.Description))
                .ForMember(d => d.Company, o => o.MapFrom(s => s.Offer.Company))
                .ForMember(d => d.Resumes, o => o.MapFrom(s => s.Offer.Resumes))
                .ForMember(d => d.Reports, o => o.MapFrom(s => s.Offer.Reports));
        }
    }
}