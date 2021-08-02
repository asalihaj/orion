using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Resumes
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid OfferId { get; set; }
            public string JobSeekerId { get; set; }
            public string CV { get; set; }
            public DateTime Last_Updated { get; set; }
        }
          public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.OfferId).NotEmpty();
                RuleFor(x => x.JobSeekerId).NotEmpty();
               
                RuleFor(x => x.CV).NotEmpty();
                RuleFor(x => x.Last_Updated).NotEmpty();

            }
        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var resume = new Resume
                {
                    OfferId = request.OfferId,
                    JobSeekerId = request.JobSeekerId,
                    CV = request.CV,
                    Last_Updated = DateTime.Now
                };

                _context.Resumes.Add(resume);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}