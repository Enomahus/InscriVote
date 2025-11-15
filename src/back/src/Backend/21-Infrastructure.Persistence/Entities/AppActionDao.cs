using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Common.Enums;
using Infrastructure.Persistence.Common;
using Pcea.Core.Net.Authorization.Persistence.Interfaces.Domain;

namespace Infrastructure.Persistence.Entities
{
    [Table("AppAction")]
    public class AppActionDao : EntityBaseDao<long>, IAction
    {
        [MaxLength(50)]
        public AppAction ActionCode { get; set; }

        public virtual ICollection<RoleDao> Roles { get; set; } = [];
        public virtual ICollection<AppPermissionDao> Permissions { get; set; } = [];

        [NotMapped]
        public ICollection<IPermission> ActionPermissions
        {
            get => (ICollection<IPermission>)Permissions;
            set => Permissions = (ICollection<AppPermissionDao>)value;
        }
    }
}
