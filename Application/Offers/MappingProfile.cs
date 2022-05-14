using Application.Companies;
using Application.Photos;
using Application.Resumes;
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
            CreateMap<Offer, OfferApplicantsList>();
            CreateMap<Offer, OfferReportsDto>();
            CreateMap<Offer, OfferPublisherDto>();
            CreateMap<Offer, ResumeDto>();
        }
    }
}