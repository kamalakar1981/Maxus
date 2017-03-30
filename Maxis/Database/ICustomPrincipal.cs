using System.Security.Principal;


namespace Maxis.Database
{
    interface ICustomPrincipal : IPrincipal
    {
        int UserId { get; set; }
        string Username { get; set; }
        string Password { get; set; }
        string Email { get; set; }
        string Mobile { get; set; }
        string Department { get; set; }
        string Title { get; set; }
        string Status { get; set; }
        int RoleId { get; set; }
    }
}
