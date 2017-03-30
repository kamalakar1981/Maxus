using Maxis.Database;
using Maxis.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.DirectoryServices.AccountManagement;
using System.Web.Mvc;

namespace Maxis.Repository
{
    public class UserRepository : IUserRepository
    {
        private MaxisEntities db = new MaxisEntities();

        // private readonly IUserRepository _context;

        public UserRepository()
        {

        }

        public List<EditUserViewModel> SelectAll()
        {
            db.Configuration.ProxyCreationEnabled = false;

            try
            {
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
    .Select(x => new EditUserViewModel()
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
            catch(Exception ex)
            {
                throw (ex);
            }
            
        }

        public List<EditUserViewModel> SelectByID(long id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
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
                        .Select(x => new EditUserViewModel()
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
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IQueryable Insert(LoginViewModel model)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                using (MaxisEntities entities = new MaxisEntities())
                {
                    var user = db.ONNET_USER.Where(u => u.Username == model.Username && u.Password == model.Password).FirstOrDefault();
                    var newuser = new ONNET_USER
                    {
                        Username = model.Username,
                        Password = model.Password,
                        Email = null,
                        Mobile = null,
                        Department = null,
                        Title = null,
                        Status = null,
                        RoleId = 3
                    };
                    var role = (from ep in db.ONNET_USER
                                join e in db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                where model.Username == ep.Username
                                select new
                                {
                                    Roles = e.RoleName
                                });
                    
                    using (var context = new MaxisEntities())
                    {
                        context.ONNET_USER.Add(newuser);
                        context.SaveChanges();
                    }
                    return role.AsQueryable();
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Update(EditUserViewModel model)
        {
            db.Configuration.ProxyCreationEnabled = false;
            try
            {
                using (MaxisEntities entities = new MaxisEntities())
                {
                    var entity = entities.ONNET_USER.FirstOrDefault(u => u.UserId == model.UserId);
                    entity.UserId = model.UserId;
                    entity.Username = model.Username;
                    entity.Email = model.Email;
                    entity.Mobile = model.Mobile;
                    entity.Department = model.Department;
                    entity.Title = model.Title;
                    entity.Status = model.Status;
                    entities.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }
    }
}