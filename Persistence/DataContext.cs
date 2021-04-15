using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) :
            base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // set primary key
            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.AppUserID, aa.ActivityId}));

            // many-to-many relationship 
            builder.Entity<ActivityAttendee>()
               .HasOne(u => u.Attendee)
               .WithMany(a => a.Activities)
               .HasForeignKey(aa => aa.AppUserID);

            builder.Entity<ActivityAttendee>()
               .HasOne(u => u.Activity)
               .WithMany(a => a.Attendees)
               .HasForeignKey(aa => aa.ActivityId);
        }
    }
}
