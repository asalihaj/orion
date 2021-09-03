using AutoMapper;
using Domain;

namespace Application.JobSeekers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<JobSeeker, JobSeekerDto>();
        }
    }
}