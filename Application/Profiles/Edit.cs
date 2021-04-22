using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Profile profile { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._userAccessor = userAccessor;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // get current user
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
                
                if (user == null) return null;

                if (String.IsNullOrWhiteSpace(request.profile.DisplayName))
                    return Result<Unit>.Failure("Display name cannot be empty.");

                // is username taken?
                var profile = await _context.Users.FirstOrDefaultAsync(
                    p => p.Id != user.Id && p.DisplayName == request.profile.DisplayName
                );

                if (profile != null) return Result<Unit>.Failure("Display name already taken.");

                user.Bio = request.profile.Bio;
                user.DisplayName = request.profile.DisplayName;

                // this will mark the entity as "dirty" and force EF to save changes to DB
                _context.Users.Update(user);

                var result = await _context.SaveChangesAsync(true) > 0;

                if (result) 
                {
                    return Result<Unit>.Success(Unit.Value);
                } else {
                    return Result<Unit>.Failure("Problem saving profile.");
                }

            }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.profile.DisplayName).NotEmpty();
            }
        }


    }
}