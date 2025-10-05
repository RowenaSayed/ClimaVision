using System.ComponentModel.DataAnnotations;

namespace Villa_API_Project.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; }
        [EmailAddress]
        [Required]
        public string  Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
