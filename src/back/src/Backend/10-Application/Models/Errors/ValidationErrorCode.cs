namespace Application.Models.Errors
{
    public enum ValidationErrorCode
    {
        Required = 0,
        MinLength,
        MaxLength,
        Unique,
        Base64Format,
        InvalidPassword,
        PositiveNumber,
        InvalidEmail,
        UserMustExist,
        UserLinked,
        RoleMustExist,
    }
}
