using WeatherNasa.DataAccess.Reposatory.IReposatory;

namespace Villa_API_Project.DataAccess.Reposatory.IReposatory
{
    public interface IUnitOfWork
    {
   
        public IAPPlicationUserReposatory User { get; }
        public IRevokedTokenRepository RevokedTokenRepository { get; }
        public IWeatherDayReposatory WeatherDay { get; }
        public IWaetherHistoryReposatory WeatherHistory { get;  }
        void save();
    }
}
