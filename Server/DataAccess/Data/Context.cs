using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WeatherNasa.Models;

namespace Villa_API_Project.DataAccess.Data
{
    public class Context: IdentityDbContext<ApplicationUser>
    {
        public Context()
        {
            
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
      
        public DbSet<ApplicationUser> Users { get; set; }

        public DbSet<RevokedToken> RevokedTokens { get; set; }
        public DbSet<WeatherDay> WeatherDay { get; set; }
        public DbSet<WeatherHistory> WeatherHistory { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)


        {
            optionsBuilder.UseSqlServer(@"Server=db28858.public.databaseasp.net; Database=db28858; User Id=db28858; Password=j?7DL8n+=sP6; Encrypt=False; MultipleActiveResultSets=True;");

            base.OnConfiguring(optionsBuilder);
        }

      
        }
    

}
