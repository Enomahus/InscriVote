using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.ExceptionServices;
using Application.Models;
using MediatR;
using Tools.Logging;

namespace Application.Behaviours
{
    [ExcludeFromCodeCoverage]
    public class PerformanceBehaviour<TRequest, TResponse>() : Behaviour<TRequest, TResponse>
        where TRequest : notnull
    {
        protected readonly Stopwatch _timer = new();

        protected override async Task<TResponse> HandleRequest(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken
        )
        {
            using var activity = ActivitySourceLog.CQRS.Start();

            _timer.Start();
            try
            {
                TResponse response = await next(cancellationToken);
                _timer.Stop();
                var elapsedMilliseconds = _timer.ElapsedMilliseconds;
                var result = response as Result;
                result?.SetDuration(elapsedMilliseconds);
                return response;
            }
            catch (Exception ex)
            {
                ExceptionDispatchInfo? exceptionDispatchInfo = ExceptionDispatchInfo.Capture(ex);
                exceptionDispatchInfo.Throw();
            }
            return default;
        }
    }
}
