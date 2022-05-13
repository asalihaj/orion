using System;
using Application.JobSeekers;

namespace Application.Resumes
{
    public class ResumeDto
    {
        public JobSeekerDto Jobseeker { get; set; }
        public string CV { get; set; }
        public string Name { get; set; }
        public string LastUpdated { get; set; }
    }
}