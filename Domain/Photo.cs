namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } // Cloudinary publicId
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}