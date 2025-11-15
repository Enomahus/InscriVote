using Tools.Exceptions.Errors;

namespace Tools.Exceptions
{
    public class ConfigurationMissingException : AppException
    {
        public ConfigurationMissingException(string message)
            : base(ErrorCode.ConfigurationMissing, ErrorKind.Technical, message) { }
    }
}
