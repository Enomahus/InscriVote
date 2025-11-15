using System.Diagnostics.CodeAnalysis;
using FluentValidation;
using MediatR;
using Tools.Logging;

namespace Application.Behaviours
{
    [ExcludeFromCodeCoverage]
    public class ValidationBehaviour<TRequest, TResponse>(
        IEnumerable<IValidator<TRequest>> validators
    ) : Behaviour<TRequest, TRequest>
        where TRequest : notnull
    {
        protected override async Task<TRequest> HandleRequest(
            TRequest request,
            RequestHandlerDelegate<TRequest> next,
            CancellationToken cancellationToken
        )
        {
            using var activity = ActivitySourceLog.CQRS.Start();

            if (validators.Any())
            {
                var context = new ValidationContext<TRequest>(request);
                var validationResults = await Task.WhenAll(
                    validators.Select(v => v.ValidateAsync(context, cancellationToken))
                );

                var failures = validationResults
                    .Where(v => v.Errors.Count != 0)
                    .SelectMany(v => v.Errors)
                    .ToList();

                if (failures.Count != 0)
                    throw new Exceptions.ValidationException(failures);
            }
            return await next(cancellationToken);
        }
    }
}
