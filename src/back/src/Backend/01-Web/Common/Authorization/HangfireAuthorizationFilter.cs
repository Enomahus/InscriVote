using Hangfire.Dashboard;

namespace Web.Common.Authorization
{
    public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HangfireAuthorizationFilter(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public bool Authorize(DashboardContext context)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            return httpContext?.User.Identity is { IsAuthenticated: true, Name: "pcea_admin" };
        }
    }
}
