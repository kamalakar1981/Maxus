using System;
using System.Collections.Generic;
using System.Linq;
using Maxis.Database;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.ViewModels;

namespace Maxis.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MaxisEntities _db = new MaxisEntities();
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<EditUserViewModel> SelectById(long id)
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

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public IQueryable Insert(LoginViewModel model)
        {
            try
            {
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
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        public void Update(EditUserViewModel model)
        {
           
            try
            {
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
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}