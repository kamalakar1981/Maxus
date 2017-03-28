using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Maxis.Interfaces
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
