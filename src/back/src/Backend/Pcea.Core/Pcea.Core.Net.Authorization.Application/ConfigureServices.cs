using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Pcea.Core.Net.Authorization.Application.Behaviours;

namespace Pcea.Core.Net.Authorization.Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddPceaCoreNetAuthorizationApplication(
            this IServiceCollection services
        )
        {
            services.AddPceaCoreNetAuthorization();
            // Do not make TryAdd because we want to have multiple implementations
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(AuthorizationBehaviour<,>));
            return services;
        }
    }
}
