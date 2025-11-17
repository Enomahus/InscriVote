using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Common.Enums;
using Infrastructure.Persistence.Common;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Persistence.Entities
{
    [Table("User")]
    public class UserDao : IdentityUser<Guid>, IEntityBaseDao<Guid>, ITimestampedEntity
    {
        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }
        public DateTimeOffset? DisabledDate { get; set; }

        [MaxLength(5)]
        [Required]
        public PersonTitle Title { get; set; }
        public ICollection<RefreshTokenDao> RefreshTokens { get; set; } = [];
        public virtual ICollection<UserRoleDao> UserRoles { get; set; } = [];

        public DateTimeOffset ModifiedAt { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public virtual ICollection<RegistrationDao> OwnRegistrationRequests { get; set; } = [];
    }
}
