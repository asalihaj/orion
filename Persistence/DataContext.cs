using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<JobSeeker> JobSeekers { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<SavedOffer> SavedOffers { get; set; }  
        public DbSet<Report> Reports { get; set; }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            BuildCompany(builder);
            BuildReport(builder);
            BuildResume(builder);
            BuildJobSeeker(builder);  
            BuildSavedOffer(builder);
        }

        private void BuildSavedOffer(ModelBuilder builder)
        {
            builder.Entity<SavedOffer>(x => x.HasKey(uo =>
            new {uo.UserId, uo.OfferId}));

            builder.Entity<SavedOffer>()
                .HasOne(u => u.User)
                .WithMany(o => o.SavedOffers)
                .HasForeignKey(u => u.UserId);
            
            builder.Entity<SavedOffer>()
                .HasOne(o => o.Offer)
                .WithMany(o => o.SavedOffers)
                .HasForeignKey(o => o.OfferId);
        }

        private void BuildJobSeeker(ModelBuilder builder)
        {
            builder.Entity<JobSeeker>(x => x.HasKey(js =>
            new {js.UserId}));
        }

        private void BuildCompany(ModelBuilder builder)
        {
            builder.Entity<Company>(x => x.HasKey(c =>
            new {c.UserId}));

            builder.Entity<Company>()
                .HasMany(c => c.Offers)
                .WithOne(o => o.Company)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }

        private void BuildReport(ModelBuilder builder)
        {
            builder.Entity<Report>(x => x.HasKey(r =>
                new {r.UserId, r.OfferId}));

            builder.Entity<Report>()
                .HasOne(u => u.User)
                .WithMany(r => r.Reports)
                .HasForeignKey(u => u.UserId);

            builder.Entity<Report>()
                .HasOne(o => o.Offer)
                .WithMany(r => r.Reports)
                .HasForeignKey(o => o.OfferId);
        }

        private void BuildResume(ModelBuilder builder)
        {
            builder.Entity<Resume>(x => x.HasKey(r =>
                new {r.OfferId, r.JobSeekerId}));

            builder.Entity<Resume>()
                .HasOne(js => js.JobSeeker)
                .WithMany(r => r.Resumes)
                .HasForeignKey(js => js.JobSeekerId);

            builder.Entity<Resume>()
                .HasOne(o => o.Offer)
                .WithMany(r => r.Resumes)
                .HasForeignKey(o => o.OfferId);
        }
    }
}
