using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Common.Enums;
using Infrastructure.Persistence.Common;

namespace Infrastructure.Persistence.Entities
{
    [Table("Registrations")]
    public class RegistrationDao : EntityBaseDao<Guid>
    {
        [Required]
        [MaxLength(20)]
        public string RequestReference { get; set; }
        public Guid AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public UserDao Author { get; set; }
        public Guid CitizenId { get; set; }

        [ForeignKey(nameof(CitizenId))]
        public CitizenDao Citizen { get; set; } = default!;
        public DateTimeOffset RegistrationDate { get; set; } = DateTimeOffset.Now;
        public RegisterStatus Status { get; set; }
        public string Comments { get; set; }
    }
}
