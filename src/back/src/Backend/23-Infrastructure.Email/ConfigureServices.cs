using System.Net;
using System.Net.Mail;
using Application.Interfaces.Services;
using Infrastructure.Email.Configurations;
using Infrastructure.Email.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Tools.Exceptions;

namespace Infrastructure.Email
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureEmailServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            var smtpConfig = configuration.GetSection("SmtpConfig");
            var smtpConfigValue = smtpConfig?.Get<SmtpConfiguration>();

            if (
                smtpConfigValue == null
                || string.IsNullOrWhiteSpace(smtpConfigValue.Host)
                || smtpConfigValue.Port == default
            )
            {
                throw new ConfigurationMissingException("Email configuration is missing");
            }

            services.AddScoped(s => new SmtpClient(smtpConfigValue.Host, smtpConfigValue.Port)
            {
                Credentials = new NetworkCredential(
                    smtpConfigValue.UserName,
                    smtpConfigValue.Password
                ),
                EnableSsl = smtpConfigValue.EnableSsl,
            });
            services.AddScoped<IEmailService, SmtpEmailService>();

            var emailConfig = configuration.GetSection("MailConfig");
            services.Configure<EmailConfiguration>(emailConfig);

            return services;
        }
    }
}
