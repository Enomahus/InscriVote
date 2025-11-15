using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Application.Features.Security.Common;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Application.Features
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddMediator(this IServiceCollection services)
        {
            var executingAssembly = Assembly.GetExecutingAssembly();
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(executingAssembly));
            services.AddValidatorsFromAssembly(executingAssembly);

            return services;
        }

        public static IServiceCollection AddApplicationFeaturesServices(
            this IServiceCollection services
        )
        {
            services.AddScoped<ITokenHelper, TokenHelper>();

            return services;
        }
    }
}
