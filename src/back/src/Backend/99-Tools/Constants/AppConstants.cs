namespace Tools.Constants
{
    public static class AppConstants
    {
        public static readonly string SuperAdminRole = "SuperAdmin";
        public static readonly string CertificationCommisionRole = "CertificationCommisionRole";
        public static readonly string VoterRole = "VoterRole";
        public static readonly string CandidateRole = "CandidateRole";

        //App link
        public const string ConfirmPasswordResetLink = "{0}/reset-password?token={1}&email={2}";
    }
}
