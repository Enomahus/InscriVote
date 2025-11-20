namespace Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendResetPasswordEmail(string? link, string toEmail);
        Task ValidateRemovalLogisticRequestEmail(string? link, string toEmail);
        Task ActivateAccountEmail(string? link, string toEmail);
    }
}
