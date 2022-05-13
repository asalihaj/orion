using Application.User;
using AutoMapper;
using Domain;

namespace Application.Contacts
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contact, ContactDto>()
                .ForMember(x => x.UserId, o => o.MapFrom(s => s.UserId));
        }
    }
}