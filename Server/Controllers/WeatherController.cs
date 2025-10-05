using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Migrations;
using WeatherNasa.Models;

namespace WeatherNasa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class WeatherController : ControllerBase
    {
        private readonly IExternalApiService _externalApiService;
        private readonly IUnitOfWork unit;
        private readonly UserManager<ApplicationUser> userManager;

        public WeatherController(IExternalApiService externalApiService, IUnitOfWork unit,UserManager<ApplicationUser> userManager)
        {
            _externalApiService = externalApiService;
            this.unit = unit;
            this.userManager = userManager;
        }

        private  async Task<bool>  IsAuth()
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (await unit.RevokedTokenRepository.IsTokenRevokedAsync(token))
            {
                return false;
            }
            return true;
        }

        [HttpGet("GetWeatherData")]
      
        public async Task<IActionResult> GetWeather(string city, string start, string end)
        {


         

            var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={city}&country=Egypt&count=1";
            using var geoDoc = await _externalApiService.GetDataAsyncJson(geoUrl);

            if (!geoDoc.RootElement.TryGetProperty("results", out var results) || results.GetArrayLength() == 0)
                return NotFound("City not found");

            var firstResult = results[0];
            var lat = firstResult.GetProperty("latitude").GetDouble();
            var lon = firstResult.GetProperty("longitude").GetDouble();

            var dailyVariables = string.Join(",", new[]
            {
        "temperature_2m_max","temperature_2m_min","temperature_2m_mean",
        "apparent_temperature_max","apparent_temperature_min","apparent_temperature_mean",
        "precipitation_sum","rain_sum","snowfall_sum",
        "windspeed_10m_max","windspeed_10m_mean","windgusts_10m_max",
        "relative_humidity_2m_max","relative_humidity_2m_min","relative_humidity_2m_mean",
        "shortwave_radiation_sum","sunshine_duration","et0_fao_evapotranspiration"
    });

            var weatherUrl =
                $"https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={lon}" +
                $"&start_date={start}&end_date={end}" +
                $"&daily={dailyVariables}&timezone=Africa/Cairo";

            using var weatherDoc = await _externalApiService.GetDataAsyncJson(weatherUrl);

            var daily = weatherDoc.RootElement.GetProperty("daily");
            var units = weatherDoc.RootElement.GetProperty("daily_units");

            var dates = daily.GetProperty("time").EnumerateArray().Select(x => x.GetString()).ToList();
            var tempMax = daily.GetProperty("temperature_2m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var tempMin = daily.GetProperty("temperature_2m_min").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var humidity = daily.GetProperty("relative_humidity_2m_mean").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var sunshine = daily.GetProperty("sunshine_duration").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var precip = daily.GetProperty("precipitation_sum").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var wind = daily.GetProperty("windspeed_10m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();
            List<WeatherDay> daysList = new List<WeatherDay>();
            for(int i = 0; i < dates.Count; i++)
            {
                var weatherDay = new WeatherDay
                {
                    Date = dates[i],
                    TempMax = tempMax[i],
                    TempMin = tempMin[i],
                    Humidity = humidity[i],
                    Sunshine = sunshine[i],
                    Precipitation = precip[i],
                    Wind = wind[i],
                    Weather_condition = unit.WeatherDay.GetWeatherCondition(precip[i], sunshine[i], tempMax[i], tempMin[i], humidity[i], wind[i])

                };

                daysList.Add(weatherDay);
            }
            var user = await userManager.GetUserAsync(User);
            if (user != null)
            {
                var History = new WeatherHistory
                {
                    startDate = start,
                    EndDate = end,
                    City = city,

                    WeatherDays = daysList,
                    UserId = user.Id
                };
                var check  = unit.WeatherHistory.GetByFilter(h =>
    h.startDate == History.startDate &&
    h.EndDate == History.EndDate &&
    h.City == History.City &&
    h.UserId == History.UserId
    && h.SearchedAT.Day == DateTime.Now.Day &&
    h.SearchedAT.Month == DateTime.Now.Month &&
    h.SearchedAT.Year == DateTime.Now.Year 
);
                if (check == null)
                {
                    unit.WeatherHistory.Create(History);
                    unit.save();
                }
            }
            return Ok(new { daysList, City = city, Country = "Egypt",startdate=start,enddate=end });
        }

        [HttpGet("download-json")]
        public async Task<IActionResult> DownloadJson(string city, string start, string end,
            bool includeTempMax = true,
    bool includeTempMin = true,
    bool includeHumidity = true,
    bool includeSunshine = true,
    bool includePrecipitation = true,
    bool includeWind = true


            )
        {
            
            var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={city}&country=Egypt&count=1";
            using var geoDoc = await _externalApiService.GetDataAsyncJson(geoUrl);

            if (!geoDoc.RootElement.TryGetProperty("results", out var results) || results.GetArrayLength() == 0)
                return NotFound("City not found");

            var firstResult = results[0];
            var lat = firstResult.GetProperty("latitude").GetDouble();
            var lon = firstResult.GetProperty("longitude").GetDouble();

            var dailyVariables = string.Join(",", new[]
            {
        "temperature_2m_max","temperature_2m_min","temperature_2m_mean",
        "apparent_temperature_max","apparent_temperature_min","apparent_temperature_mean",
        "precipitation_sum","rain_sum","snowfall_sum",
        "windspeed_10m_max","windspeed_10m_mean","windgusts_10m_max",
        "relative_humidity_2m_max","relative_humidity_2m_min","relative_humidity_2m_mean",
        "shortwave_radiation_sum","sunshine_duration","et0_fao_evapotranspiration"
    });

            var weatherUrl =
                $"https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={lon}" +
                $"&start_date={start}&end_date={end}" +
                $"&daily={dailyVariables}&timezone=Africa/Cairo";

            using var weatherDoc = await _externalApiService.GetDataAsyncJson(weatherUrl);

            var daily = weatherDoc.RootElement.GetProperty("daily");
            var units = weatherDoc.RootElement.GetProperty("daily_units");

            var dates = daily.GetProperty("time").EnumerateArray().Select(x => x.GetString()).ToList();
            var tempMax = daily.GetProperty("temperature_2m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var tempMin = daily.GetProperty("temperature_2m_min").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var humidity = daily.GetProperty("relative_humidity_2m_mean").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var sunshine = daily.GetProperty("sunshine_duration").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var precip = daily.GetProperty("precipitation_sum").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var wind = daily.GetProperty("windspeed_10m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();

           var daysList = new List<object>();
            for (int i = 0; i < dates.Count; i++)
            {
                var dayObj = new Dictionary<string, object>();

                dayObj["Date"] = dates[i];
                

                if (includeTempMax) dayObj["TempMax"] = tempMax[i];
                if (includeTempMin) dayObj["TempMin"] = tempMin[i];
                if (includeHumidity) dayObj["Humidity"] = humidity[i];
                if (includeSunshine) dayObj["Sunshine"] = sunshine[i];
                if (includePrecipitation) dayObj["Precipitation"] = precip[i];
                if (includeWind) dayObj["Wind"] = wind[i];
              
                    dayObj["Weather_condition"] = unit.WeatherDay.GetWeatherCondition(
                        precip[i], sunshine[i], tempMax[i], tempMin[i], humidity[i], wind[i]);
                

                daysList.Add(dayObj);
            }

            var user = await userManager.GetUserAsync(User);

            var UnitObg = new Dictionary<string, object>();

            


            if (includeTempMax) UnitObg["TempMax"] = units.GetProperty("temperature_2m_max").GetString();
            if (includeTempMin) UnitObg["TempMin"] = units.GetProperty("temperature_2m_min").GetString();
            if (includeHumidity) UnitObg["Humidity"] = units.GetProperty("relative_humidity_2m_mean").GetString();
            if (includeSunshine) UnitObg["Sunshine"] = units.GetProperty("sunshine_duration").GetString();
            if (includePrecipitation) UnitObg["Precipitation"] = units.GetProperty("precipitation_sum").GetString();
            if (includeWind) UnitObg["Wind"] = units.GetProperty("windspeed_10m_max").GetString();

            var exportData = new
            {
                metadata = new
                {
                    start_date = start,
                    end_date = end,
                    City=city,
                    Country="Egypt",
                    units = UnitObg,
                    source= "https://open-meteo.com/",
              
                },
                weather_data = daysList
            };

            var jsonString = JsonSerializer.Serialize(exportData, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            var bytes = System.Text.Encoding.UTF8.GetBytes(jsonString);

            return File(bytes, "application/json", "WeatherData.json");
        }


        [HttpGet("download-csv")]
        public async Task<IActionResult> DownloadCsv(string city, string start, string end,
            bool includeTempMax = true,
    bool includeTempMin = true,
    bool includeHumidity = true,
    bool includeSunshine = true,
    bool includePrecipitation = true,
    bool includeWind = true

            )
        {
            
            var geoUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={city}&country=Egypt&count=1";
            using var geoDoc = await _externalApiService.GetDataAsyncJson(geoUrl);

            if (!geoDoc.RootElement.TryGetProperty("results", out var results) || results.GetArrayLength() == 0)
                return NotFound("City not found");

            var firstResult = results[0];
            var lat = firstResult.GetProperty("latitude").GetDouble();
            var lon = firstResult.GetProperty("longitude").GetDouble();

            var dailyVariables = string.Join(",", new[]
            {
        "temperature_2m_max","temperature_2m_min",
        "precipitation_sum","windspeed_10m_max",
        "relative_humidity_2m_mean","sunshine_duration"
    });

            var weatherUrl =
                $"https://archive-api.open-meteo.com/v1/era5?latitude={lat}&longitude={lon}" +
                $"&start_date={start}&end_date={end}" +
                $"&daily={dailyVariables}&timezone=Africa/Cairo";

            using var weatherDoc = await _externalApiService.GetDataAsyncJson(weatherUrl);

            var daily = weatherDoc.RootElement.GetProperty("daily");
            var units = weatherDoc.RootElement.GetProperty("daily_units");

            var dates = daily.GetProperty("time").EnumerateArray().Select(x => x.GetString()).ToList();
            var tempMax = daily.GetProperty("temperature_2m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var tempMin = daily.GetProperty("temperature_2m_min").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var humidity = daily.GetProperty("relative_humidity_2m_mean").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var sunshine = daily.GetProperty("sunshine_duration").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var precip = daily.GetProperty("precipitation_sum").EnumerateArray().Select(x => x.GetDouble()).ToList();
            var wind = daily.GetProperty("windspeed_10m_max").EnumerateArray().Select(x => x.GetDouble()).ToList();

            var sb = new StringBuilder();

            sb.AppendLine($"# City: {city}");
            sb.AppendLine($"# Country: Egypt");
            sb.AppendLine($"# Latitude: {lat}");
            sb.AppendLine($"# Longitude: {lon}");
            sb.AppendLine($"# Start Date: {start}");
            sb.AppendLine($"# End Date: {end}");
            sb.AppendLine($"# Source: https://open-meteo.com/");
            sb.AppendLine();

            var header = new List<string> { "Date" };
            if (includeTempMax) header.Add($"TempMax({units.GetProperty("temperature_2m_max").GetString()})");
            if (includeTempMin) header.Add($"TempMin({units.GetProperty("temperature_2m_min").GetString()})");
            if (includeHumidity) header.Add($"Humidity({units.GetProperty("relative_humidity_2m_mean").GetString()})");
            if (includeSunshine) header.Add($"Sunshine({units.GetProperty("sunshine_duration").GetString()})");
            if (includePrecipitation) header.Add($"Precipitation({units.GetProperty("precipitation_sum").GetString()})");
            if (includeWind) header.Add($"Wind({units.GetProperty("windspeed_10m_max").GetString()})");
            header.Add($"WeatherCondition");
            sb.AppendLine(string.Join(",", header));

            for (int i = 0; i < dates.Count; i++)
            {
                var row = new List<string> { dates[i] };

                if (includeTempMax) row.Add(tempMax[i].ToString());
                if (includeTempMin) row.Add(tempMin[i].ToString());
                if (includeHumidity) row.Add(humidity[i].ToString());
                if (includeSunshine) row.Add(sunshine[i].ToString());
                if (includePrecipitation) row.Add(precip[i].ToString());
                if (includeWind) row.Add(wind[i].ToString());
                row.Add(unit.WeatherDay.GetWeatherCondition(
                        precip[i], sunshine[i], tempMax[i], tempMin[i], humidity[i], wind[i]));
                sb.AppendLine(string.Join(",", row));
            }
            var bytes = Encoding.UTF8.GetBytes(sb.ToString());

            return File(bytes, "text/csv", $"weather-{city}-{start}-to-{end}.csv");
        }

        [HttpGet("history/{id:int}")]
        [Authorize]
        public async Task<IActionResult> HistoryById(int id)
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");
            if (id == 0) return NotFound("Not found");
            var history = unit.WeatherHistory.GetByFilter(h => h.Id == id, Includes: "WeatherDays");
            if (history == null) return NotFound("not found");

            return Ok(history);
        }



        [HttpGet("download-json/{id:int}")]
        [Authorize]
       
        public async Task<IActionResult> DownloadJson(int id, bool includeTempMax = true,
    bool includeTempMin = true,
    bool includeHumidity = true,
    bool includeSunshine = true,
    bool includePrecipitation = true,
    bool includeWind = true
)
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");
            if (id == 0) return NotFound("Not found");
            var history = unit.WeatherHistory.GetByFilter(h => h.Id == id, Includes: "WeatherDays");
            if (history == null) return NotFound("not found");

            var daysList = new List<object>();
            foreach(var day in history.WeatherDays)
            {
                var dayObj = new Dictionary<string, object>();

                dayObj["Date"] = day.Date;


                if (includeTempMax) dayObj["TempMax"] = day.TempMax;
                if (includeTempMin) dayObj["TempMin"] = day.TempMin;
                if (includeHumidity) dayObj["Humidity"] = day.Humidity;
                if (includeSunshine) dayObj["Sunshine"] = day.Sunshine;
                if (includePrecipitation) dayObj["Precipitation"] = day.Precipitation;
                if (includeWind) dayObj["Wind"] = day.Wind;

                dayObj["Weather_condition"] = day.Weather_condition;


                daysList.Add(dayObj);
            }

            var user = await userManager.GetUserAsync(User);

            var UnitObg = new Dictionary<string, object>();




            if (includeTempMax) UnitObg["TempMax"] = SD.tempMax;
            if (includeTempMin) UnitObg["TempMin"] = SD.tempMin;
            if (includeHumidity) UnitObg["Humidity"] = SD.humidity;
            if (includeSunshine) UnitObg["Sunshine"] = SD.sunshine;
            if (includePrecipitation) UnitObg["Precipitation"] = SD.precipitation;
            if (includeWind) UnitObg["Wind"] = SD.wind;

            var exportData = new
            {
                metadata = new
                {
                    start_date = history.startDate,
                    end_date = history.EndDate,
                    SearchedAt=history.SearchedAT,
                    City = history.City,
                    Country = "Egypt",
                    units = UnitObg,
                    source = "https://open-meteo.com/",
                 
                },
                weather_data = daysList
            };


            

            var jsonString = JsonSerializer.Serialize(exportData, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            var bytes = System.Text.Encoding.UTF8.GetBytes(jsonString);

            return File(bytes, "application/json", "WeatherData.json");
        }




        [HttpGet("download-csv/{id:int}")]
        [Authorize]
        public async Task<IActionResult> DownloadCsv(int id, bool includeTempMax = true,
    bool includeTempMin = true,
    bool includeHumidity = true,
    bool includeSunshine = true,
    bool includePrecipitation = true,
    bool includeWind = true)
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");

            if (id == 0) return NotFound("Not found");
            var history = unit.WeatherHistory.GetByFilter(h => h.Id == id, Includes: "WeatherDays");

            if (history == null) return NotFound("not found");
            var sb = new StringBuilder();

            sb.AppendLine($"# City: {history.City}");
            sb.AppendLine($"# Country: Egypt");
          
            sb.AppendLine($"# Start Date: {history.startDate}");
            sb.AppendLine($"# End Date: {history.EndDate}");
            sb.AppendLine($"# Searched At: {history.SearchedAT}");
            sb.AppendLine($"# Source: https://open-meteo.com/");
            sb.AppendLine();

            var header = new List<string> { "Date" };
            if (includeTempMax) header.Add($"TempMax({SD.tempMax})");
            if (includeTempMin) header.Add($"TempMin({SD.tempMin})");
            if (includeHumidity) header.Add($"Humidity({SD.humidity})");
            if (includeSunshine) header.Add($"Sunshine({SD.sunshine})");
            if (includePrecipitation) header.Add($"Precipitation({SD.precipitation})");
            if (includeWind) header.Add($"Wind({SD.wind})");
            header.Add($"WeatherCondition");
            sb.AppendLine(string.Join(",", header));

            foreach (var day in history.WeatherDays)
            {
                var row = new List<string> { day.Date};

                if (includeTempMax) row.Add(day.TempMax.ToString());
                if (includeTempMin) row.Add(day.TempMin.ToString());
                if (includeHumidity) row.Add(day.Humidity.ToString());
                if (includeSunshine) row.Add(day.Sunshine.ToString());
                if (includePrecipitation) row.Add(day.Precipitation.ToString());
                if (includeWind) row.Add(day.Wind.ToString());
                row.Add(day.Weather_condition);
                sb.AppendLine(string.Join(",", row));
            }

            var bytes = Encoding.UTF8.GetBytes(sb.ToString());

            return File(bytes, "text/csv", $"weather-{history.City}-{history.startDate}-to-{history.EndDate}.csv");
        }


        [HttpGet("AllHistory")]
        [Authorize]
        public async Task<IActionResult> AllHistory()
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");
            var user = await userManager.GetUserAsync(User);
            var history = unit.WeatherHistory.GetALL(h => h.UserId == user.Id,Includes: "WeatherDays");

            return Ok(history);
        }

    }
}
