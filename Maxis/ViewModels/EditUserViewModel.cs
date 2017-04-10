using Maxis.Database;
using System;


namespace Maxis.ViewModels
{
    public class EditUserViewModel
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Department { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Roles { get; set; }
        public long RoleId { get; set; }
    }
}