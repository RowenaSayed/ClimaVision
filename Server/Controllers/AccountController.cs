using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Villa_API_Project.DataAccess.Data;
using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using Villa_API_Project.DTO;
using WeatherNasa.DataAccess.Reposatory.IReposatory;
using WeatherNasa.Models;

namespace WeatherNasa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUnitOfWork unit;

        private readonly IAuthRepository auth;
        private readonly IJWT_TokenReposatory jwt_token;
        UserManager<ApplicationUser> userManager;
        public AccountController(IJWT_TokenReposatory Token, UserManager<ApplicationUser> userManager, IUnitOfWork unit, IAuthRepository auth)
        {
            this.unit = unit;
            this.auth = auth;
            jwt_token = Token;
            this.userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));


            var result = await auth.Register(model);


            if (result.Succeeded)
            {
               
                return Ok("User registered successfully.");
            }


            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));


            var token = await auth.LoginAsync(model);
            if (token == null)
                return Unauthorized("Invalid username or password.");
           

         
            return Ok(new LoginResponseDTO { Message = "Login successful.", Token = token });
        }


        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {

            
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (await unit.RevokedTokenRepository.IsTokenRevokedAsync(token))
            {
                return Unauthorized("Token revoked. Please login again.");
            }
            if (string.IsNullOrEmpty(token))
                return BadRequest("Token not found");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var expiryDate = jwtToken.ValidTo;

            await unit.RevokedTokenRepository.AddRevokedTokenAsync(token, expiryDate);

            return Ok("Logged out successfully, token revoked.");
        }
    }
}
