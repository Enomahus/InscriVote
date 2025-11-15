using System.Diagnostics.CodeAnalysis;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Web.Features.Infrastructure.HealthCheck
{
    // This controller does not have /api prefix, it can be used anonymously.
    [ExcludeFromCodeCoverage]
    [OpenApiTag("health")]
    public class HealthCheckController : ControllerBase
    {
        /// <summary>
        /// Check if the server is healthy
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        [ProducesResponseType(typeof(void), (int)HttpStatusCode.OK)]
        public Task<OkResult> CheckHealth()
        {
            return Task.FromResult(Ok());
        }
    }
}
