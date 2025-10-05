using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.DataAccess.Reposatory.IReposatory
{
    public interface IRevokedTokenRepository:IReposatory<RevokedToken>
    {
        Task AddRevokedTokenAsync(string token, DateTime expiryDate);
        Task<bool> IsTokenRevokedAsync(string token);
    }
}
