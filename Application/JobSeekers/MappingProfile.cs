using System.Linq;
using Application.Offers;
using AutoMapper;
using Domain;

namespace Application.JobSeekers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<JobSeeker, JobSeekerDto>();
            CreateMap<JobSeeker, JSProfileDto>();
            CreateMap<SavedOffer, OfferPublisherDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Offer.Id))
                .ForMember(d => d.Title, o => o.MapFrom(s => s.Offer.Title))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Offer.Category))
                .ForMember(d => d.Location, o => o.MapFrom(s => s.Offer.Location))
                .ForMember(d => d.Schedule, o => o.MapFrom(s => s.Offer.Schedule))
                .ForMember(d => d.Salary, o => o.MapFrom(s => s.Offer.Salary))
                .ForMember(d => d.ExpDate, o => o.MapFrom(s => s.Offer.ExpDate))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Offer.Description))
                .ForMember(d => d.Company, o => o.MapFrom(s => s.Offer.Company));
        }
    }
}