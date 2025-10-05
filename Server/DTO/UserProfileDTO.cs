using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace Villa_API_Project.DTO
{
    public class UserProfileDTO
    {
        public string Name { get; set; }
        public string? phoneNumber { get; set; }
        [ValidateNever]
        public IFormFile? imagefile { get; set; }
    }
}
