using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public DateTime DateCreated { get; set; }
        public DateTime LastUpdated { get; set; }
        public virtual Company Company { get; set; }
        public virtual JobSeeker JobSeeker { get; set; }
        public virtual ICollection<SavedOffer> SavedOffers { get; set; }
        public virtual ICollection<Report> Reports { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }

        public Task AddToRoleAsync(AppUser user, string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> CreateAsync(AppUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> DeleteAsync(AppUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}