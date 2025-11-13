using Application.Interfaces.Services;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.SQLServer.Contexts;

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

        public Task<UserDao> GetUserForAuthenticationAsync(string userName)
        {
            throw new NotImplementedException();
        }
    }
}
