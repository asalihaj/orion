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
                            UserName = "michaeljackson",
                            Email = "mj21@gmail.com",
                            DateCreated = DateTime.Now,
                            LastUpdated = DateTime.Now
                        },
                        new AppUser
                        {
                            UserName = "markzuck",
                            Email = "mz15@gmail.com",
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
                        }
                    };
                    foreach(var user in users)
                    {
                        await userManager.CreateAsync(user, "Pa$$w0rd");
                    }
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
            context.SaveChanges();
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
                    Description = "Connect the world",
                    LastUpdated = DateTime.Now
                },
                new Company
                {
                    User = users.ElementAt(1),
                    Name = "Instagram",
                    Location = "California",
                    Description = "Connect the world",
                    LastUpdated = DateTime.Now
                },
                new Company
                {
                    User = users.ElementAt(2),
                    Name = "Snapchat",
                    Location = "California",
                    Description = "Connect with friends",
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
    }
}