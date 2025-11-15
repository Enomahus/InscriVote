using System.Diagnostics.CodeAnalysis;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using Tools.Logging;

namespace Application.Behaviours
{
    [ExcludeFromCodeCoverage]
    public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest>
        where TRequest : notnull
    {
        protected readonly string _name;
        protected readonly ILogger<TRequest> _logger;

        public LoggingBehaviour(ILogger<TRequest> logger)
        {
            _name = GetType().Name;
            _logger = logger;
        }

        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            using var activity = ActivitySourceLog.CQRS.Start();

            var requestName = typeof(TRequest).Name;
            var userId = "Anonymous";
            _logger.LogInformation(
                "App Request: {Ip} {Name} {@UserId} {@Request}",
                "",
                requestName,
                userId,
                request
            );

            return Task.CompletedTask;
        }
    }
}
