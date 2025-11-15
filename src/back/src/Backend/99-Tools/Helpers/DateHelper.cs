namespace Tools.Helpers
{
    public static class DateHelper
    {
        public static DateTimeOffset? SetToMidnightUtc(DateTimeOffset? input)
        {
            if (input == null)
            {
                return null;
            }
            DateTime dateOnly = input.Value.Date;

            // Crée un DateTimeOffset à minuit UTC (offset zéro)
            DateTimeOffset result = new DateTimeOffset(dateOnly, TimeSpan.Zero);

            return result;
        }
    }
}
