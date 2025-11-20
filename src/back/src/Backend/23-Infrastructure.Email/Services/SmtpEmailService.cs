using System.Net.Mail;
using Application.Interfaces.Services;
using Infrastructure.Email.Configurations;
using Microsoft.Extensions.Options;

namespace Infrastructure.Email.Services
{
    public class SmtpEmailService(SmtpClient smtpClient, IOptions<EmailConfiguration> config)
        : IEmailService
    {
        public async Task ActivateAccountEmail(string? link, string toEmail)
        {
            var body =
                @$"
                <p>Pour activer votre compte CEI, veuillez cliquer sur le lien : </p>
                <a href=""{link}"" traget="">{link}</a>
                ";
            var subject = "Activation de compte CEI";
            await SendEmailAsync(body, subject, toEmail);
        }

        public async Task SendResetPasswordEmail(string? link, string toEmail)
        {
            var body =
                @$"
            <p>Pour modifier votre mot de passe, veuillez cliquer sur ce lien : </p>
            <a href=""{link}"" target=""_blank"">{link}</a>
        ";

            var subject = "Modification du mot de passe de votre compte CEI";

            await SendEmailAsync(body, subject, toEmail);
        }

        public Task ValidateRemovalLogisticRequestEmail(string? link, string toEmail)
        {
            throw new NotImplementedException();
        }

        private async Task SendEmailAsync(string htmlBody, string subject, string toEmail)
        {
            var mailMeaasge = new MailMessage
            {
                From = new MailAddress(config.Value.FromEmail ?? "", config.Value.FromName),
                Body = htmlBody,
                Subject = subject,
                IsBodyHtml = true,
            };

            mailMeaasge.To.Add(toEmail);
            await smtpClient.SendMailAsync(mailMeaasge);
        }
    }
}
