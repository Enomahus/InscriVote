using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Enums;
using Infrastructure.Persistence.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Persistence.SQLServer.Contexts
{
    public class ApplicationDbContext
        : IdentityDbContext<
            UserDao,
            RoleDao,
            Guid,
            IdentityUserClaim<Guid>,
            UserRoleDao,
            IdentityUserLogin<Guid>,
            IdentityRoleClaim<Guid>,
            IdentityUserToken<Guid>
        >
    {
        public DbSet<RefreshTokenDao> RefreshTokens { get; set; }
        public DbSet<AppActionDao> AppActions { get; set; }
        public DbSet<AppPermissionDao> AppPermissions { get; set; }

        public ApplicationDbContext() { }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            //base.ConfigureConventions(configurationBuilder);
            configurationBuilder
                .Properties<AppPermission>()
                .HaveConversion<EnumToStringConverter<AppPermission>>();
            configurationBuilder
                .Properties<AppAction>()
                .HaveConversion<EnumToStringConverter<AppAction>>();
            configurationBuilder
                .Properties<AuthProvider>()
                .HaveConversion<EnumToStringConverter<AuthProvider>>();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.UseCollation("SQL_Latin1_General_CP1_CI_AI");

            builder.Entity<UserDao>().Property(e => e.UserName).HasMaxLength(100);
            builder.Entity<UserDao>().Property(e => e.FirstName).HasMaxLength(100);
            builder.Entity<UserDao>().Property(e => e.LastName).HasMaxLength(100);
            builder.Entity<UserDao>().Property(e => e.Email).HasMaxLength(100);
            builder.Entity<UserDao>().Property(e => e.PhoneNumber).HasMaxLength(50);

            builder
                .Entity<UserDao>()
                .HasMany(u => u.RefreshTokens)
                .WithOne(r => r.User)
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .Entity<UserRoleDao>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(x => x.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .Entity<UserRoleDao>()
                .HasOne(e => e.Role)
                .WithMany()
                .HasForeignKey(e => e.RoleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            builder
                .Entity<RoleDao>()
                .HasMany(e => e.Actions)
                .WithMany(e => e.Roles)
                .UsingEntity(j => j.ToTable("RoleAppAction"));
            builder
                .Entity<AppActionDao>()
                .HasMany(e => e.Permissions)
                .WithMany(e => e.Actions)
                .UsingEntity(j => j.ToTable("AppActionAppPermission"));
        }
    }
}
