using System.Security.Principal;
namespace Maxis.ViewModels
{
    public class CustomPrincipal : IPrincipal
    {
        public IIdentity Identity { get; }
        public bool IsInRole(string role) { return false; }
        public CustomPrincipal(string username)
        {
            Identity = new GenericIdentity(username);
        }
        public string Username { get; set; }
    }

    public class UserModel
    {
        public string Username { get; set; }
    }
}