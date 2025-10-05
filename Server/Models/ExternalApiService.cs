namespace WeatherNasa.Models
{
    using System.Text.Json;

    public interface IExternalApiService
    {
        Task<Dictionary<string, object>> GetDataAsync(string url);
        Task<JsonDocument> GetDataAsyncJson(string url);
    }

    public class ExternalApiService : IExternalApiService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ExternalApiService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<Dictionary<string, object>> GetDataAsync(string url)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException($"Error fetching data: {response.StatusCode}");

            var json = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var dictionary = JsonSerializer.Deserialize<Dictionary<string, object>>(json, options);

            return dictionary ?? new Dictionary<string, object>();
        }

        public async Task<JsonDocument> GetDataAsyncJson(string url)
        {
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new HttpRequestException($"Error fetching data: {response.StatusCode}");

            var json = await response.Content.ReadAsStringAsync();

            return JsonDocument.Parse(json);
        }

    }
}
