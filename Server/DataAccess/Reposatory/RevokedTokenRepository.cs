using Microsoft.EntityFrameworkCore;
using Villa_API_Project.DataAccess.Data;
using Villa_API_Project.DataAccess.Reposatory;
using WeatherNasa.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.DataAccess.Reposatory
{
    public class RevokedTokenRepository:Reposatory<RevokedToken>,IRevokedTokenRepository
    {
        Context Context;
        public RevokedTokenRepository(Context context) : base(context)
        {
            this.Context = context;

        }

        public async Task AddRevokedTokenAsync(string token, DateTime expiryDate)
        {
            var revoked = new RevokedToken
            {
                Token = token,
                ExpiryDate = expiryDate
            };

            Create(revoked);
            await Context.SaveChangesAsync();
        }

        public async Task<bool> IsTokenRevokedAsync(string token)
        {
            return await Context.RevokedTokens
                       .AnyAsync(t => t.Token == token && t.ExpiryDate > DateTime.UtcNow);
        }
    }
}
