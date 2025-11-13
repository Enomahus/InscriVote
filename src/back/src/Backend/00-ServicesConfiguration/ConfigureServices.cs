using Application.Features;
using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ServicesConfiguration
{
    public static class ConfigureServices
    {
        public static IServiceCollection ConfigureAllServices(
            this IServiceCollection services,
            IConfiguration config
        )
        {
            services.AddMediator();
            services.AddInfrastructureServices(config);
            services.AddInfrastructurePersistenceServices(config);
            services.AddApplicationFeaturesServices();

            return services;
        }
    }
}
