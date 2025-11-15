using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Enums;
using Tools.Constants;

namespace Infrastructure.Persistence.SQLServer.Contexts.Data
{
    public static class RolesData
    {
        public static readonly Dictionary<string, List<AppAction>> RolesSeed = new()
        {
            { AppConstants.SuperAdminRole, [AppAction.SuperAdmin] },
            { AppConstants.CertificationCommisionRole, [AppAction.UsersAdministration] },
            { AppConstants.CandidateRole, [AppAction.CandidateAdministration] },
            { AppConstants.VoterRole, [AppAction.VoterAdministration] },
        };

        public static readonly Dictionary<AppAction, List<AppPermission>> ActionsSeed = new()
        {
            { AppAction.SuperAdmin, Enum.GetValues<AppPermission>().ToList() },
            {
                AppAction.UsersAdministration,
                [
                    AppPermission.AccessUsersAdminPage,
                    AppPermission.GetUsers,
                    AppPermission.GetUser,
                    AppPermission.CreateUser,
                    AppPermission.UpdateUser,
                    AppPermission.DeleteUser,
                    AppPermission.GetAllRoles,
                    AppPermission.CheckEmailBeUnique,
                ]
            },
            { AppAction.CandidateAdministration, [] },
            { AppAction.VoterAdministration, [] },
        };
    }
}
