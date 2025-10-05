using Microsoft.AspNetCore.Identity;
using Villa_API_Project.DataAccess.Data;
using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using WeatherNasa.DataAccess.Reposatory;
using WeatherNasa.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace Villa_API_Project.DataAccess.Reposatory
{
    public class UnitOfWork:IUnitOfWork
    {
       
        public IAPPlicationUserReposatory User { get; private set; }

        public IRevokedTokenRepository RevokedTokenRepository { get; private set; }

        public IWeatherDayReposatory WeatherDay { get; private set; }


        public IWaetherHistoryReposatory WeatherHistory { get; private set; }


        private Context context;
        private UserManager<ApplicationUser> userManager;
        private readonly IConfiguration _config;

        public UnitOfWork(Context context)
        {
            this.context = context;
         
            User = new ApplicationUserReposatory(context);
            RevokedTokenRepository = new RevokedTokenRepository(context);

            WeatherDay = new WeatherDayReposatory(context);
            WeatherHistory = new WeatherHistoryReposatory(context);
        }
        public void save()
        {
            context.SaveChanges();
        }
    }
}
