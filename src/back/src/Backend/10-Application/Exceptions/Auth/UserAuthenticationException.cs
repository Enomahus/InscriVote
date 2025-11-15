using Infrastructure.Persistence.Entities;
using Tools.Exceptions;
using Tools.Exceptions.Errors;

namespace Application.Exceptions.Auth
{
    public class UserAuthenticationException : AppException
    {
        public UserAuthenticationException(string userName)
            : base(
                ErrorCode.AuthenticationFailed,
                ErrorKind.Authentication,
                $"User authentication failed for user : {userName}",
                null,
                new Dictionary<string, string>() { { nameof(UserDao.UserName), userName } }
            ) { }

        public UserAuthenticationException(string userName, Exception innerException)
            : base(
                ErrorCode.AuthenticationFailed,
                ErrorKind.Authentication,
                $"User authentication failed for user : {userName}",
                innerException,
                null,
                new Dictionary<string, string>() { { nameof(UserDao.UserName), userName } }
            ) { }
    }
}
