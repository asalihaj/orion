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
            CreateMap<Resume, DownloadDto>()
                .ForMember(x => x.OfferId, o => o.MapFrom(s => s.OfferId))
                .ForMember(x => x.Url, o => o.MapFrom(s => s.CV));
            CreateMap<Resume, ResumeDto>()
                .ForMember(x => x.Jobseeker, o => o.MapFrom(s => s.JobSeeker));
        }
    }
}