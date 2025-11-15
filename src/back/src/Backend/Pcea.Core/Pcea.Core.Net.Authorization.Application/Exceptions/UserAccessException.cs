namespace Pcea.Core.Net.Authorization.Application.Exceptions
{
    public class UserAccessException : AuthorizationException
    {
        public UserAccessException(
            Exception? innerException = null,
            IDictionary<string, object?>? additionalData = null
        )
            : base($"Insufficient rights for user", innerException, additionalData) { }
    }
}
