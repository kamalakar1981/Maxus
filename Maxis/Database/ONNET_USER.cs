//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Maxis.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class ONNET_USER
    {
        public long UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public Nullable<System.DateTime> DateModified { get; set; }
        public long RoleId { get; set; }
        public string Mobile { get; set; }
        public string Department { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string PasswordHash { get; set; }
    
        public virtual ONNET_USERROLE ONNET_USERROLE { get; set; }
    }
}
