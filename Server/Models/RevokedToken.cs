namespace WeatherNasa.Models
{
    public class RevokedToken
    {
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }
    }
}
