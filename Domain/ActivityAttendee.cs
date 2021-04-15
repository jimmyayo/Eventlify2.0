using System;
namespace Domain
{
    public class ActivityAttendee
    {
        public string AppUserID { get; set; }
        public AppUser Attendee { get; set; }
        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public bool IsHost { get; set; }
    }
}