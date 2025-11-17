using System.ComponentModel.DataAnnotations.Schema;
using Application.Common.Enums;
using Infrastructure.Persistence.Common;

namespace Infrastructure.Persistence.Entities
{
    [Table("Citizens")]
    public class CitizenDao : EntityBaseDao<Guid>
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string MarriedName { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public Gender Gender { get; set; }
        public string Nationality { get; set; } = default!;
        public string NationalIdNumber { get; set; } = default!;
        public string Email { get; set; }
        public string PhoneNumber { get; set; } = default!;
        public ICollection<RegistrationDao> Registrations { get; set; } = [];
    }
}
