
using System.Security.Principal;


namespace Maxis.Database
{
    public class CustomPrincipal : ICustomPrincipal
    {
        public IIdentity Identity { get; }
        public bool IsInRole(string role) { return false; }
        public CustomPrincipal(string email)
        {
            Identity = new GenericIdentity(email);
        }
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Department { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public int RoleId { get; set; }
    }

    public class CustomPrincipalSerializeModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Department { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public int RoleId { get; set; }
    }
}