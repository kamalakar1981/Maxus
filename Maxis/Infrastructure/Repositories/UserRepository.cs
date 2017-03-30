using System;
using System.Collections.Generic;
using System.Linq;
using Maxis.Database;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.ViewModels;


namespace Maxis.Infrastructure.Repositories.Abstract
{
    public class UserRepository : IUserRepository
    {
        private readonly MaxisEntities _db = new MaxisEntities();

        // private readonly IUserRepository _context;

      

        public List<EditUserViewModel> SelectAll()
        {
 
            try
            {
              
                    var result = (from ep in _db.ONNET_USER
                        join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                        where ep.RoleId == e.RoleId
                        select new EditUserViewModel()
                        {
                            UserId = ep.UserId,
                            Username = ep.Username,
                            Email = ep.Email,
                            Department = ep.Department,
                            Title = ep.Title,
                            Status = ep.Status,
                            Roles = e.RoleName
                        }).ToList();
 
                    return (result.ToList());
                
            }
            catch(Exception)
            {
                throw;
            }
            
        }

        public List<EditUserViewModel> SelectByID(long id)
        {
            try
            {
               
                    var result = (from ep in _db.ONNET_USER
                        join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                        where ep.UserId == id
                        select new EditUserViewModel()
                        {
                            UserId = ep.UserId,
                            Username = ep.Username,
                            Email = ep.Email,
                            Department = ep.Department,
                            Title = ep.Title,
                            Status = ep.Status,
                            Roles = e.RoleName
                        }).ToList();
                     
                    return (result.ToList());
                
            }
            catch (Exception )
            {
                throw;
            }
        }

        public IQueryable Insert(LoginViewModel model)
        {
            try
            {
                //using (var entities = new MaxisEntities())
                //{
                   var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == model.Username && u.Password == model.Password);

                    if (user == null)
                    {
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

                        using (var context = new MaxisEntities())
                        {
                            context.ONNET_USER.Add(newuser);
                            context.SaveChanges();
                        }

                        IQueryable role = (from ep in _db.ONNET_USER
                                           join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                           where model.Username == ep.Username
                                           select new
                                           {
                                               Roles = e.RoleName
                                           });


                        return role.AsQueryable();
                    }
                    else
                    {
                        IQueryable role = (from ep in _db.ONNET_USER
                                           join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                           where model.Username == ep.Username
                                           select new
                                           {
                                               Roles = e.RoleName
                                           });


                        return role.AsQueryable();

                    }

                   
                 
               // }
                
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Update(EditUserViewModel model)
        {
           
            try
            {
                //using (var entities = new MaxisEntities())
                //{
                    var entity = _db.ONNET_USER.FirstOrDefault(u => u.UserId == model.UserId);
                    if (entity != null)
                    {
                        entity.UserId = model.UserId;
                        entity.Username = model.Username;
                        entity.Email = model.Email;
                        entity.Mobile = model.Mobile;
                        entity.Department = model.Department;
                        entity.Title = model.Title;
                        entity.Status = model.Status;
                    }
                    _db.SaveChanges();
               // }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //public void Save()
        //{
        //    _db.SaveChanges();
        //}
    }
}