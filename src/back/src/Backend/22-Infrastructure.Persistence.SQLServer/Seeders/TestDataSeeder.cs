using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Persistence.Configuration;
using Infrastructure.Persistence.Entities;
using Infrastructure.Persistence.SQLServer.Contexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Tools.Constants;

namespace Infrastructure.Persistence.SQLServer.Seeders
{
    public class TestDataSeeder(
        WritableDbContext context,
        UserManager<UserDao> userManager,
        IOptions<DataConfiguration> dataConfig,
        TimeProvider timeProvider
    ) : SeederBase(context, userManager)
    {
        public override async Task SeedDataAsync()
        {
            if (!dataConfig.Value.SeedTest)
            {
                return;
            }

            var strategy = _context.Database.CreateExecutionStrategy();
            await strategy.ExecuteInTransactionAsync(
                async () =>
                {
                    await SeedUsersAsync();
                },
                () => Task.FromResult(true)
            );
        }

        private async Task SeedUsersAsync()
        {
            var users = GetMockUsers(timeProvider.GetUtcNow());

            foreach (var userWithRole in users)
            {
                if (
                    !(await _context.Users.AnyAsync(u => u.UserName == userWithRole.Item1.UserName))
                )
                    await SeedUserAsync(userWithRole.Item1, "Secret1", userWithRole.Item2);
            }
            await _context.SaveChangesAsync();
        }

        public static IEnumerable<Tuple<UserDao, List<string>>> GetMockUsers(DateTimeOffset now)
        {
            return new List<Tuple<UserDao, List<string>>>
            {
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "admin",
                        FirstName = "Jean-Yves",
                        LastName = "Kouadio",
                        Email = "jeanyves.kouadio@yopmail.com",
                        PhoneNumber = "+225 01 02 03 04 05",
                    },
                    [AppConstants.SuperAdminRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user1",
                        FirstName = "Marie",
                        LastName = "Lemoine",
                        Email = "marie.lemoine@apollossc.com",
                        PhoneNumber = "+33 6 12 34 56 78",
                    },
                    [AppConstants.CertificationCommisionRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user2",
                        FirstName = "Luc",
                        LastName = "Bertrand",
                        Email = "luc.bertrand@apollossc.com",
                        PhoneNumber = "+33 4 56 78 90 12",
                    },
                    [AppConstants.VoterRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user3",
                        FirstName = "Sophie",
                        LastName = "Martel",
                        Email = "sophie.martel@apollossc.com",
                        PhoneNumber = "+33 5 98 76 54 32",
                    },
                    [AppConstants.CandidateRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user4",
                        FirstName = "Antoine",
                        LastName = "Girard",
                        Email = "antoine.girard@apollossc.com",
                        PhoneNumber = "+33 3 21 43 65 87",
                    },
                    [AppConstants.VoterRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user5",
                        FirstName = "Camille",
                        LastName = "Rousseau",
                        Email = "camille.rousseau@apollossc.com",
                        PhoneNumber = "+33 2 34 56 78 90",
                    },
                    [AppConstants.VoterRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user6",
                        FirstName = "Julien",
                        LastName = "Blanchard",
                        Email = "julien.blanchard@apollossc.com",
                        PhoneNumber = "+33 1 23 45 67 89",
                    },
                    [AppConstants.CandidateRole]
                ),
                Tuple.Create<UserDao, List<string>>(
                    new()
                    {
                        UserName = "user7",
                        FirstName = "Elise",
                        LastName = "Durand",
                        Email = "elise.durand@apollossc.com",
                        PhoneNumber = "+33 6 78 90 12 34",
                    },
                    [AppConstants.CertificationCommisionRole]
                ),
            };
        }
    }
}
