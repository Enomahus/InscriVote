using Application.Exceptions.Auth;
using Application.Interfaces.Services;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.SQLServer.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Security.Common
{
    public class TokenHelper(ITokenService tokenService, WritableDbContext context) : ITokenHelper
    {
        public Task<TokenResponse> GenerateTokenAsync(
            UserDao user,
            CancellationToken cancellationToken
        )
        {
            var userRoleId = user.UserRoles.Select(ur => ur.Role.Id.ToString());
            throw new NotImplementedException();
        }

        public async Task<UserDao> GetUserForAuthenticationAsync(string userName)
        {
            return await context
                    .Users.Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                    .Where(u => u.UserName == userName)
                    .FirstOrDefaultAsync() ?? throw new UserAuthenticationException(userName!);
        }
    }
}
