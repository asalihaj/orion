using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Resumes
{
    public class Details
    {
        public class Query : IRequest<Resume>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Resume>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Resume> Handle(Query request, CancellationToken cancellationToken)
            {
                var resume = await _context.Resumes.FindAsync(request.Id);

                if (resume == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, 
                    new {resume = "Not found"});

                return resume;
            }
        }
    }
}