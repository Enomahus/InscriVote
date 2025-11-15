using System.Diagnostics;
using Newtonsoft.Json;

namespace Tools.Logging
{
    public static class ActivitySourceExtensions
    {
        public static Activity? StartActivityExt(
            this ActivitySource src,
            string classe,
            string method,
            params object?[] parameters
        )
        {
            var parametersJson =
                parameters != null ? parameters.Select(JsonConvert.SerializeObject).ToList() : [];

            return src.StartActivity(
                $"[{src.Name}] {classe}.{method}({string.Join(", ", parametersJson)})"
            );
        }

        public static void SetException(this Activity activity, Exception ex)
        {
            activity?.AddException(ex);
            activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
        }
    }
}
