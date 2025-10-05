using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WeatherNasa.Models
{
    public class WeatherDay
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public double TempMax { get; set; }
        public double TempMin { get; set; }
     
        public double Humidity { get; set; }
       
        public double Sunshine { get; set; }

        public double Precipitation { get; set; }
      
        public double Wind { get; set; }

        public string Weather_condition { get; set; }
        [ForeignKey("History")]
        public int History_id { get; set; }
        [JsonIgnore]
        public WeatherHistory History { get; set; }

    }
}
