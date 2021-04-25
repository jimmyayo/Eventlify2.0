using System;

namespace Domain
{
    public class Comment
    {
        public int Id { get; set; }
        public string CommentText { get; set; }
        public bool Deleted {get;set;}
        
        public AppUser Author { get; set; }
        public Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    }
}