using System.Linq;
using AutoMapper;
using Domain;

namespace Application.JobSeekers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<JobSeeker, JobSeekerDto>()
               .ForMember(d => d.Photo, o => o.MapFrom(s => s.User.Photos.FirstOrDefault(x=> x.IsMain).Url));

        }
    }
}