using AutoMapper;
using Domain;

namespace Application.Companies
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Company, CompanyDto>();
        }
    }
}