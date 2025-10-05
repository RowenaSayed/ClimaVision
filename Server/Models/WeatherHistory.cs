using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WeatherNasa.Models
{
    public class WeatherHistory
    {
        public int Id { get; set; }

        public string startDate { get; set; }
        public string EndDate { get; set; }
        public DateTime SearchedAT { get; set; } = DateTime.UtcNow;
        public string? City { get; set; }
        public string? Country { get; set; } = "Egypt";
        public List<WeatherDay> WeatherDays { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        [JsonIgnore]
        public ApplicationUser User { get; set; }
    }
}
