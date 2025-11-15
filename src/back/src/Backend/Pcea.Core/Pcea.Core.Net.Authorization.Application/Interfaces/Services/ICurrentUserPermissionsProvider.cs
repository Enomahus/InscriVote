namespace Pcea.Core.Net.Authorization.Application.Interfaces.Services
{
    public interface ICurrentUserPermissionsProvider
    {
        public Task<IEnumerable<string>> GetCurrentUserPermissionsAsync(
            CancellationToken cancellationToken = default
        );

        public Task<bool> IsCurrentUserAuthenticatedAsync(
            CancellationToken cancellationToken = default
        );
    }
}
