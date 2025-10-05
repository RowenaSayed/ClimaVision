using Villa_API_Project.DataAccess.Data;
using Villa_API_Project.DataAccess.Reposatory;
using WeatherNasa.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.DataAccess.Reposatory
{
    public class WeatherHistoryReposatory:Reposatory<WeatherHistory>,IWaetherHistoryReposatory
    {
        Context Context;
        public WeatherHistoryReposatory(Context context) : base(context)
        {
            this.Context = context;

        }
    }
}
