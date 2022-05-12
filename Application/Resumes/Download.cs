using System;
using System.IO;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Resumes
{
    public class Download
    {
        public class Command : IRequest<DownloadDto>
        {
            public Guid OfferId { get; set; }
            public string JobSeekerId { get; set; }
        }
          public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OfferId).NotEmpty();
            }
        }


        public class Handler : IRequestHandler<Command, DownloadDto>
        {
            private readonly DataContext _context;
            private readonly IResumeAccessor _resumeAccessor;
            public Handler(DataContext context, IResumeAccessor resumeAccessor)
            {
                _context = context;
                _resumeAccessor = resumeAccessor;
            }

            public async Task<DownloadDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var offerId = request.OfferId.ToString();
                var url = await _resumeAccessor.GetDownloadLink(offerId);

                var downloadUrl = new DownloadDto 
                {
                    OfferId = offerId,
                    Url = url
                };

                return downloadUrl;
            }
        }
    }
}