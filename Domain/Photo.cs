namespace Domain
{
    public class Photo
    {
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
        public string Url { get; set; }
        public string Name { get; set; }
    }
}