using Infrastructure.Persistence.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Persistence
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructurePersistenceServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.Configure<DataConfiguration>(configuration.GetSection("DataConfig"));
            //services.AddApolloCoreNetAuthorizationPersistence();

            return services;
        }
    }
}
