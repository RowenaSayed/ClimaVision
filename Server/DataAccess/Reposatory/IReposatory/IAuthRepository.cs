using Microsoft.AspNetCore.Identity;
using Villa_API_Project.DTO;

namespace Villa_API_Project.DataAccess.Reposatory.IReposatory
{
    public interface IAuthRepository
    {
        Task<IdentityResult>  Register(RegisterDTO model);

        Task<string> LoginAsync(LoginDTO model);
    }
}
