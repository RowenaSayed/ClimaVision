using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.DataAccess.Reposatory.IReposatory
{
    public interface IWeatherDayReposatory:IReposatory<WeatherDay>
    {
        string GetWeatherCondition(double precip, double sunshine, double tempMax, double tempMin, double humidity, double wind);
    }
}
