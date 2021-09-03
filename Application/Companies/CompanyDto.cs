using System;
using Application.User;
using Newtonsoft.Json;

namespace Application.Companies
{
    public class CompanyDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Logo { get; set; }
    }
}