using Maxis.Database;
using Maxis.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.Repository
{
    public class UserRepository : IUserRepository
    {
        private MaxisEntities db = new MaxisEntities();

        // private readonly IUserRepository _context;

        public UserRepository()
        {

        }

        public List<ONNET_USER> SelectAll()
        {
            db.Configuration.ProxyCreationEnabled = false;

            using (MaxisEntities db = new MaxisEntities())
            {
                var result = (from ep in db.ONNET_USER
                              join e in db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                              where ep.RoleId == e.RoleId
                              select new
                              {
                                  UserId = ep.UserId,
                                  Username = ep.Username,
                                  Email = ep.Email,
                                  Department = ep.Department,
                                  Title = ep.Title,
                                  Status = ep.Status,
                                  Roles = e.RoleName
                              }).ToList()
.Select(x => new ONNET_USER()
{
    UserId = x.UserId,
    Username = x.Username,
    Email = x.Email,
    Department = x.Department,
    Title = x.Title,
    Status = x.Status,
    Roles = x.Roles
});

                return (result.ToList());
            }
            
        }

        public List<ONNET_USER> SelectByID(long id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            using (MaxisEntities db = new MaxisEntities())
            {
                var result = (from ep in db.ONNET_USER
                              join e in db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                              where ep.UserId == id 
                              select new
                              {
                                  UserId = ep.UserId,
                                  Username = ep.Username,
                                  Email = ep.Email,
                                  Department = ep.Department,
                                  Title = ep.Title,
                                  Status = ep.Status,
                                  Roles = e.RoleName
                              }).ToList()
                              .Select(x => new ONNET_USER()
                              {
                                  UserId = x.UserId,
                                  Username = x.Username,
                                  Email = x.Email,
                                  Department = x.Department,
                                  Title = x.Title,
                                  Status = x.Status,
                                  Roles = x.Roles
                              });
                return (result.ToList());
            }
        }

        public void Insert(ONNET_USER obj)
        {
            db.ONNET_USER.Add(obj);
        }

        public void Update(ONNET_USER obj)
        {
            db.Configuration.ProxyCreationEnabled = false;
            using (MaxisEntities entities = new MaxisEntities())
            {
                var entity = entities.ONNET_USER.FirstOrDefault(u => u.UserId == obj.UserId);
                entity.UserId = obj.UserId;
                entity.Username = obj.Username;
                entity.Email = obj.Email;
                entity.Mobile = obj.Mobile;
                entity.Department = obj.Department;
                entity.Title = obj.Title;
                entity.Status = obj.Status;
                entities.SaveChanges();
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}