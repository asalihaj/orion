using System.Collections.Generic;
using Application.Companies;
using Application.Offers;
using Domain;
using Newtonsoft.Json;

namespace Application.User
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public dynamic Profile { get; set; }
        public string Photo { get; set; }

        [JsonProperty("saved")]
        public ICollection<OfferDto> SavedOffers { get; set; }
    }
}