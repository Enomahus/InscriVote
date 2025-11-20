using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Exceptions.Auth;
using Application.Features.Security.Common;
using Application.Models;
using Application.Models.Errors;
using FluentValidation;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.SQLServer.Contexts;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Tools.Constants;
using Tools.Helpers;
using Tools.Logging;

namespace Application.Features.Security.RefreshToken
{
    public class RefreshTokenCommand : IRequest<Result<TokenResponse>>
    {
        public string? UserName { get; set; }
        public string? RefreshToken { get; set; }
    }

    public class RefreshTokenCommandValidator : AbstractValidator<RefreshTokenCommand>
    {
        public RefreshTokenCommandValidator()
        {
            RuleFor(v => v.UserName)
                .NotEmpty()
                .WithMessage(ValidationErrorCode.Required.ToString());

            RuleFor(v => v.RefreshToken)
                .NotEmpty()
                .WithMessage(ValidationErrorCode.Required.ToString())
                .DependentRules(() =>
                {
                    RuleFor(v => v.RefreshToken)
                        .Must(t => Base64Helper.IsBase64String(t!))
                        .WithMessage(ValidationErrorCode.Base64Format.ToString());
                });
        }
    }

    public class RefreshTokenCommandHandler(
        WritableDbContext context,
        UserManager<UserDao> userManager,
        ITokenHelper tokenHelper,
        TimeProvider timeProvider
    ) : IRequestHandler<RefreshTokenCommand, Result<TokenResponse>>
    {
        public async Task<Result<TokenResponse>> Handle(
            RefreshTokenCommand request,
            CancellationToken cancellationToken
        )
        {
            using var activity = ActivitySourceLog.CQRS.Start();

            Guid? tokenId = Base64Helper.GetGuidFromBase64(request.RefreshToken!);

            var tokenQuery = context.RefreshTokens.Where(rf => rf.Id == tokenId);
            UserDao? user = null;
            IList<string> roles;

            tokenQuery = tokenQuery.Where(rt =>
                rt.User != null && rt.User.UserName == request.UserName
            );
            user = await tokenHelper.GetUserForAuthenticationAsync(request.UserName!);
            roles = await userManager.GetRolesAsync(user);

            var tokenDb = await tokenQuery.SingleOrDefaultAsync(cancellationToken);

            if (tokenDb is null || tokenDb.Expiry < timeProvider.GetUtcNow())
            {
                throw new UserAuthenticationException(request.UserName!);
            }

            context.RefreshTokens.Remove(tokenDb);

            var model = await tokenHelper.GenerateTokenAsync(user, cancellationToken);
            return Result<TokenResponse>.From(model);
        }
    }
}
