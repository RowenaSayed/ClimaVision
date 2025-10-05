using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace WeatherNasa.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string Name { get; set; }

        [ValidateNever]
        public string? ImageURL { get; set; } = "/Images/default.png";
        [NotMapped]
        public IFormFile? Imagefile { get; set; }
    }
}
