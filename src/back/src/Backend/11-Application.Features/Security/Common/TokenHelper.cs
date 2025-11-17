using Application.Exceptions.Auth;
using Application.Interfaces.Services;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.SQLServer.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Security.Common
{
    public class TokenHelper(ITokenService tokenService, WritableDbContext context) : ITokenHelper
    {
        public async Task<TokenResponse> GenerateTokenAsync(
            UserDao user,
            CancellationToken cancellationToken
        )
        {
            var userRoleId = user.UserRoles.Select(ur => ur.Role.Id.ToString());
            //var userEntitiesRoles = user.UserRoles.ToDictionary(
            //    u => u.UserId,
            //    u => u.RoleId.ToString()
            //);
            var token = await tokenService.CreateTokensAsync(
                user,
                userRoleId,
                //userEntitiesRoles,
                cancellationToken
            );
            var model = new TokenResponse(token.AccessToken, token.RefreshToken);
            return model;
        }

        public async Task<UserDao> GetUserForAuthenticationAsync(string userName)
        {
            return await context
                    .Users.Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                    .ThenInclude(r => r.Actions)
                    .ThenInclude(a => a.Permissions)
                    .Where(u => u.UserName == userName)
                    .FirstOrDefaultAsync() ?? throw new UserAuthenticationException(userName);
        }
    }
}
