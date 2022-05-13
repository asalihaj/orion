using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Resumes
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid OfferId { get; set; }
            public string JobSeekerId { get; set; }
            public IFormFile CV { get; set; }
        }
          public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OfferId).NotEmpty();
                RuleFor(x => x.CV).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IResumeAccessor _resumeAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IResumeAccessor resumeAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _resumeAccessor = resumeAccessor;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var checkResume = await _context.Resumes.FindAsync(request.OfferId, request.JobSeekerId);
                var jobSeeker = await _context.JobSeekers.SingleOrDefaultAsync(x => x.UserId == request.JobSeekerId);

                var fileName = jobSeeker.FirstName + "_" + jobSeeker.LastName + "_" + jobSeeker.User.UserName;
                

                if(checkResume != null) 
                    throw new RestException(HttpStatusCode.NotAcceptable, "You already applied");
                
                var resumeUploadResult = await _resumeAccessor.AddResume(request.CV, request.OfferId.ToString(), fileName);
                
                var resume = new Resume
                {
                    OfferId = request.OfferId,
                    JobSeekerId = request.JobSeekerId,
                    CV = resumeUploadResult.CV,
                    Name = resumeUploadResult.Name,
                    LastUpdated = DateTime.Now
                };

                await _context.Resumes.AddAsync(resume);
                var success = await _context.SaveChangesAsync() > 0;
                
                if (!success)
                    throw new RestException(HttpStatusCode.InternalServerError, "Problem saving photo");

                return Unit.Value;
            }
        }
    }
}