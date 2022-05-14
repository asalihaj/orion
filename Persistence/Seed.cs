using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
                var users = new List<AppUser>();
                
                if(!userManager.Users.Any())
                {
                    users = new List<AppUser>
                    {
                        new AppUser
                        {
                            UserName = "mark",
                            Email = "mark@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "jeff",
                            Email = "jeff@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "linus",
                            Email = "linus@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "rick",
                            Email = "rick@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "rio",
                            Email = "rio@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "asd",
                            Email = "asd@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        }
                    };
                    foreach(var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }

                    var companies = CreateCompanies(users);
                    if(!context.Companies.Any())
                    {
                        context.Companies.AddRange(companies);
                    }

                    var offers = CreateOffers(companies);
                    if(!context.Offers.Any())
                    {
                        context.Offers.AddRange(offers);
                    }

                    var jobseekers = CreateJobSeekers(users);
                    if(!context.JobSeekers.Any())
                    {
                        context.JobSeekers.AddRange(jobseekers);
                    }

                    var savedoffers = CreateSavedOffers(offers, jobseekers);
                    if(!context.SavedOffers.Any())
                    {
                        context.SavedOffers.AddRange(savedoffers);
                    }
                }
                
            context.SaveChanges();
        }

        private static List<JobSeeker> CreateJobSeekers(List<AppUser> users)
        {
            var jobseekers = new List<JobSeeker>
            {
                new JobSeeker
                {
                    User = users.ElementAt(4),
                    FirstName = "Rio",
                    LastName = "Williams",
                    Gender = "m",
                    Bio = "I'm from Kosovo",
                    Birthday = DateTime.Now,
                    LastUpdated = DateTime.Now
                },
                new JobSeeker
                {
                    User = users.ElementAt(5),
                    FirstName = "John",
                    LastName = "Adams",
                    Gender = "m",
                    Bio = "I'm from Georgia",
                    Birthday = DateTime.Now,
                    LastUpdated = DateTime.Now
                }
            };
            return jobseekers;
        }

      
        private static List<Company> CreateCompanies(List<AppUser> users)
        {
            var companies = new List<Company>
            {
                new Company
                {
                    User = users.ElementAt(0),
                    Name = "Facebook",
                    Location = "California",
                    Description = "Meta Platforms, Inc., doing business as Meta and formerly known as Facebook, Inc., " + 
                        "and TheFacebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California.",
                    LastUpdated = DateTime.Now
                },
                new Company
                {
                    User = users.ElementAt(1),
                    Name = "Instagram",
                    Location = "California",
                    Description = "Instagram is an American photo and video sharing social networking service founded in 2010 by Kevin " +
                       "Systrom and Mike Krieger, and later acquired by Facebook Inc.. The app allows users to upload media that can be " + 
                       "edited with filters and organized by hashtags and geographical tagging.",
                    LastUpdated = DateTime.Now
                },
                new Company
                {
                    User = users.ElementAt(2),
                    Name = "Snapchat",
                    Location = "California",
                    Description = "Snapchat is an American multimedia instant messaging app and service developed by Snap Inc., originally " + 
                        "Snapchat Inc. One of the principal features of Snapchat is that pictures and messages are usually only available for a " + 
                        "short time before they become inaccessible to their recipients.",
                    LastUpdated = DateTime.Now
                },
            };

            return companies;
        }

        private static List<Offer> CreateOffers(List<Company> companies)
        {
                var offers = new List<Offer>
                {
                    new Offer
                    {
                        Company = companies.ElementAt(0),
                        Title = "Software Developer",
                        Category = "IT",
                        Location = "New York",
                        Schedule = "Full-time",
                        Salary = 500,
                        ExpDate = DateTime.Now.AddMonths(1),
                        Description = "Senior web developer",
                        LastUpdated = DateTime.Now
                        
                    },
                    new Offer
                    {
                        Company = companies.ElementAt(0),
                        Title = "Web Developer",
                        Location = "Prishtine",
                        Category = "IT",
                        Schedule = "Part-time",
                        Salary = 400,
                        ExpDate = DateTime.Now.AddMonths(2),
                        Description = "Junior software developer",
                        LastUpdated = DateTime.Now
                    },
                    new Offer
                    {
                        Company = companies.ElementAt(2),
                        Title = "Architect",
                        Location = "Peje",
                        Category = "Architecture",
                        Schedule = "Full-time",
                        Salary = 450,
                        ExpDate = DateTime.Now.AddMonths(2),
                        Description = "Data Scientist",
                        LastUpdated = DateTime.Now
                    },
                    new Offer
                    {
                        Company = companies.ElementAt(1),
                        Title = "Accountant",
                        Location = "New Jersey",
                        Category = "Economy",
                        Schedule = "Part-time",
                        Salary = 800,
                        ExpDate = DateTime.Now.AddMonths(3),
                        Description = "Data Engineer",
                        LastUpdated = DateTime.Now
                    }
                };

            return offers;
        }

        private static List<SavedOffer> CreateSavedOffers(List<Offer> offers, List<JobSeeker> jobSeekers)
        {
            var savedOffers = new List<SavedOffer>
            {
                new SavedOffer
                {
                    JobSeekerId = jobSeekers.ElementAt(0).UserId,
                    OfferId = offers.ElementAt(0).Id,
                    LastUpdated = DateTime.Now
                },
                new SavedOffer
                {
                    JobSeekerId = jobSeekers.ElementAt(0).UserId,
                    OfferId = offers.ElementAt(1).Id,
                    LastUpdated = DateTime.Now
                },
                new SavedOffer
                {
                    JobSeekerId = jobSeekers.ElementAt(0).UserId,
                    OfferId = offers.ElementAt(2).Id,
                    LastUpdated = DateTime.Now
                },
                new SavedOffer
                {
                    JobSeekerId = jobSeekers.ElementAt(1).UserId,
                    OfferId = offers.ElementAt(0).Id,
                    LastUpdated = DateTime.Now
                },
            };
            return savedOffers;
        }
    }
}