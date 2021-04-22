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
            public string DisplayName { get; set; }
            public string Bio { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
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

            public async Task<Result<Unit>> Handle(Command command, CancellationToken cancellationToken)
            {
                // get current user
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername());
                
                if (user == null) return null;

                // if (String.IsNullOrWhiteSpace(command.DisplayName))
                //     return Result<Unit>.Failure("Display name cannot be empty.");

                // is username taken?
                if (await _context.Users.FirstOrDefaultAsync(
                    p => p.Id != user.Id && p.DisplayName == command.DisplayName
                ) != null) {
                    return Result<Unit>.Failure("Display name already taken.");
                }

                user.Bio = command.Bio ?? user.Bio;
                user.DisplayName = command.DisplayName ?? user.DisplayName;

                // this will mark the entity as "dirty" and force EF to save changes to DB
                _context.Users.Update(user);

                var success = await _context.SaveChangesAsync(true) > 0;

                if (success) 
                    return Result<Unit>.Success(Unit.Value);
                
                    return Result<Unit>.Failure("Problem saving profile.");
            }
        }



    }
}