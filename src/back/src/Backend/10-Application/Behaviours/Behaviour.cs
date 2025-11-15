using System.Diagnostics.CodeAnalysis;
using MediatR;

namespace Application.Behaviours
{
    [ExcludeFromCodeCoverage]
    public abstract class Behaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        where TRequest : notnull
    {
        protected readonly string _name;

        protected Behaviour()
        {
            _name = GetType().Name;
        }

        public Task<TResponse> Handle(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken
        )
        {
            return HandleRequest(request, next, cancellationToken);
        }

        protected abstract Task<TResponse> HandleRequest(
            TRequest request,
            RequestHandlerDelegate<TResponse> next,
            CancellationToken cancellationToken
        );
    }
}
