using Application;
using Application.Features;
using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tools;

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
            services.AddToolsServices(config);
            services.AddInfrastructureServices(config);
            services.AddInfrastructurePersistenceServices(config);
            //services.AddInfrastructureSQLServerServices(configuration);
            services.AddApplicationServices();
            services.AddApplicationFeaturesServices();

            return services;
        }
    }
}
