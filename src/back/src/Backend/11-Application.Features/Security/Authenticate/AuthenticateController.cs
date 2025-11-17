using System.Diagnostics.CodeAnalysis;
using Application.Api;
using Application.Features.Security.Common;
using Application.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using Tools.Exceptions.Errors;

namespace Application.Features.Security.Authenticate
{
    [ExcludeFromCodeCoverage]
    [ApiController]
    [Route("auth")]
    [OpenApiTag("auth")]
    public class AuthenticateController : ApiControllerBase
    {
        [HttpPost("token")]
        [AllowAnonymous]
        [OpenApiOperation("Authenticate", "Authentifie un utilisateur.", "")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Result<TokenResponse>))]
        [ProducesResponseType(StatusCodes.Status401Unauthorized, Type = typeof(Result<Error>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Result<Error>))]
        public async Task<Result<TokenResponse>> AnthenticateAsync(
            [FromBody] AuthenticateCommand query,
            CancellationToken cancellationToken
        )
        {
            return await Mediator.Send(query, cancellationToken);
        }
    }
}
