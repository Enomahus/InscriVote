using Infrastructure.Configurations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Time.Testing;

namespace Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            services.Configure<TokenConfiguration>(configuration.GetSection("JwtConfig"));

            if (configuration.GetValue<bool?>("FixedTime") == true)
            {
                services.AddSingleton<TimeProvider>(sp => new FakeTimeProvider(
                    new DateTimeOffset(2026, 1, 1, 10, 0, 0, TimeSpan.Zero)
                )
                {
                    AutoAdvanceAmount = TimeSpan.FromSeconds(1),
                });
            }

            services.AddHttpClient();

            return services;
        }
    }
}
