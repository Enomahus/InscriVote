using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Infrastructure.Persistence.Common;

namespace Infrastructure.Persistence.Entities
{
    [Table("Documents")]
    public class DocumentDao : EntityBaseDao<Guid>
    {
        [Required]
        [MaxLength(100)]
        public required string FileName { get; set; }

        [Required]
        [MaxLength(80)]
        public required string DocumentType { get; set; }

        [Required]
        public required long Size { get; set; }

        public Guid RegistrationId { get; set; }

        [ForeignKey(nameof(RegistrationId))]
        public RegistrationDao Registration { get; set; } = default!;

        public string FilePath { get; set; } = default!;
        public DateTimeOffset UploadedAt { get; set; } = DateTimeOffset.Now;
    }
}
