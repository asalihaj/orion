using Application.Companies;
using Application.User;
using AutoMapper;
using Domain;

namespace Application.Resumes
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Resume, ApplicantDto>();
        }
    }
}