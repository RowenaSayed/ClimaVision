using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Villa_API_Project.DataAccess.Reposatory.IReposatory;
using Villa_API_Project.DTO;
using WeatherNasa.Models;

namespace Villa_API_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUnitOfWork unit;
        private readonly IWebHostEnvironment env;
        private readonly UserManager<ApplicationUser> userManger;

        public UserProfileController(IUnitOfWork unit ,IWebHostEnvironment env,UserManager<ApplicationUser> userManger)
        {
            this.unit = unit;
            this.env = env;
            this.userManger = userManger;
        }

        private async Task<bool> IsAuth()
        {

            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (await unit.RevokedTokenRepository.IsTokenRevokedAsync(token))
            {
                return false;
            }
            return true;
        }
        [HttpGet]
 
        public async Task<IActionResult> getProfile()
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");

            var user = await userManger.GetUserAsync(User);

            if (user == null) return BadRequest("User not found");
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";
            var imageUrl = string.IsNullOrEmpty(user.ImageURL)
                ? null
                : baseUrl + user.ImageURL;
            return Ok(new
            {
                user.Email,
                user.Name,
                user.PhoneNumber,
                imageUrl

            });
        }


        [HttpPut]
        public async Task<IActionResult> updateprofile(UserProfileDTO profileDTO)
        {
            var isAuth = await IsAuth();
            if (!isAuth)
                return Unauthorized("Token revoked or invalid please login ");

            if (!ModelState.IsValid)
                return BadRequest(ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
            var user = await userManger.GetUserAsync(User);

            if (user == null) return BadRequest("User not found");
            if(profileDTO.Name!=null)
            user.Name = profileDTO.Name;
            user.PhoneNumber = profileDTO.phoneNumber;
            if(profileDTO.imagefile!=null && profileDTO.imagefile.Length > 0)
            {
                if(user.ImageURL!= "/Images/default.png")
                unit.User.DeleteImageMethod(user.ImageURL, env);
                user.ImageURL = unit.User.GetImageURL(profileDTO.imagefile, user.Id, env);
            }
            await userManger.UpdateAsync(user);
            var request = HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";
            var imageUrl = string.IsNullOrEmpty(user.ImageURL)
                ? null
                : baseUrl + user.ImageURL;
            return Ok(new
            {
                user.Email,
                user.Name,
                user.PhoneNumber,
                imageUrl

            });

        }
    }
}
