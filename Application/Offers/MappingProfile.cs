using Application.Companies;
using Application.Photos;
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
            CreateMap<Offer, OfferPublisherDto>();
        }
    }
}