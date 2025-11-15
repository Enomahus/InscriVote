using System.Reflection;
using Pcea.Core.Net.Authorization.Application.Attributes;
using Pcea.Core.Net.Authorization.Application.Interfaces.Services;
using Pcea.Core.Net.Authorization.Application.Requests;
using Pcea.Core.Net.Authorization.Interfaces.Handlers;

namespace Pcea.Core.Net.Authorization.Application.Behaviours
{
    public abstract class BasicEntityAuthorizationBehaviour<TRequest, TResponse, T_EntityId>(
        ICurrentUserEntityPermissionsProvider<T_EntityId> permissionsProvider,
        IAuthorizationHandler handler
    ) : EntityAuthorizationBehaviour<TRequest, TResponse, T_EntityId>(permissionsProvider, handler)
        where TRequest : notnull, IEntityAuthorizedRequest<T_EntityId>
    {
        protected override Task<T_EntityId> GetRequestEntityIdAsync(
            TRequest request,
            IEnumerable<IPermissionsHolder> permissionAttributes,
            CancellationToken cancellationToken
        )
        {
            return Task.FromResult(request.AuthorizationEntityId);
        }

        protected override Task<IEnumerable<IPermissionsHolder>> GetRequiredPermissionsHoldersAsync(
            TRequest request,
            CancellationToken cancellationToken
        )
        {
            return Task.FromResult<IEnumerable<IPermissionsHolder>>(
                request.GetType().GetCustomAttributes<EntityPermissionAttribute>()
            );
        }
    }
}
