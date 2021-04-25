using System.Linq;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername,
                o =>
                    o.MapFrom(s =>
                        s.Attendees
                           .FirstOrDefault(x => x.IsHost)
                           .Attendee
                           .UserName));
                           
            CreateMap<ActivityAttendee, AttendeeDto>()
               .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Attendee.DisplayName))
               .ForMember(d => d.Username, o => o.MapFrom(s => s.Attendee.UserName))
               .ForMember(d => d.Bio, o => o.MapFrom(s => s.Attendee.Bio))
               .ForMember(d => d.Image, o => o.MapFrom(s => s.Attendee.Photos.FirstOrDefault(x => x.IsMain).Url));


            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain).Url));
            
            CreateMap<Comment,CommentDto>()
               .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.Author.DisplayName))
               .ForMember(d => d.Username, o => o.MapFrom(s => s.Author.UserName))
               .ForMember(d => d.Body, o => o.MapFrom(s => s.CommentText))
               .ForMember(d => d.Image, o => o.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url))
               ;

        }
    }
}
