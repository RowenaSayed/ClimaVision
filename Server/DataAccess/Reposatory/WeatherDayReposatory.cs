using Villa_API_Project.DataAccess.Data;
using Villa_API_Project.DataAccess.Reposatory;
using WeatherNasa.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.DataAccess.Reposatory
{
    public class WeatherDayReposatory:Reposatory<WeatherDay>,IWeatherDayReposatory
    {
        Context Context;
        public WeatherDayReposatory(Context context) : base(context)
        {
            this.Context = context;

        }

        public string GetWeatherCondition(double precip, double sunshine, double tempMax, double tempMin, double humidity, double wind)
        {
            if (precip > 5 || (precip > 0 && humidity > 80))
                return "Rainy";

            if (sunshine > 30000 && precip == 0 && tempMax >= 30)
                return "Sunny and Hot";

            if (sunshine > 30000 && precip == 0 && tempMax <= 10)
                return "Sunny and Cold";

            if (sunshine > 30000 && precip == 0 && wind >= 30)
                return "Sunny and Windy";

            if (tempMax >= 30 && humidity >= 70)
                return "Humid and Hot";

            if (tempMax >= 35)
                return "Very Hot";

            if (tempMin <= 10)
                return "Very Cold";

            if (sunshine > 30000 && precip == 0)
                return "Sunny";

            if (sunshine < 10000 && precip == 0)
                return "Cloudy";

            if (wind >= 40)
                return "Very Windy";

            return "Comfortable";
        }

    }
}
