using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using Villa_API_Project.DTO;
using WeatherNasa.Models;

namespace Villa_API_Project.DataAccess.Reposatory
{
    public class AuthRepository:IAuthRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        RoleManager<IdentityRole> roleManager;
        SignInManager<ApplicationUser> _signinManager;

        IJWT_TokenReposatory Token;
        public AuthRepository(IJWT_TokenReposatory Token, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> _signinManager)
        {
            _userManager = userManager;
            this.roleManager = roleManager;
            this._signinManager = _signinManager;
            this.Token = Token;
        }

        public async Task<string> LoginAsync(LoginDTO model)
        {


            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return null;


            var result=await _signinManager.CheckPasswordSignInAsync(user, model.Password, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return null;
            }

            var userid = user.Id;
            string token = Token.GenerateToken(userid);

            return token;

        
        }

        public  async Task<IdentityResult>Register(RegisterDTO model)
        {
            


            var byEmail =await  _userManager.FindByEmailAsync(model.Email);
            if (byEmail != null)
            {
                return IdentityResult.Failed(new IdentityError
                {
                    Code = "DuplicateEmail",
                    Description = "Email already exists."
                });
            }


            var user = new ApplicationUser
            {
                UserName = model.Email,
                Email = model.Email,
                Name = model.Name
            };


            var result = await _userManager.CreateAsync(user, model.Password);


            if (result.Succeeded)
            {
        

               
                return result;

            }


            return result;
        }

       
    }
}
