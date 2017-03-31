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
 
                    return result;
                
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
        public IQueryable Insert(LoginViewModel loginViewModel)
        {
            try
            {
                var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == loginViewModel.Username && u.Password == loginViewModel.Password);
               // var user = "username"; 
                    if (user == null)
                    {
                        var newuser = new ONNET_USER
                        {
                            Username = loginViewModel.Username,
                            Password = loginViewModel.Password,
                            Email = null,
                            Mobile = null,
                            Department = null,
                            Title = null,
                            Status = null,
                            RoleId = 3
                        };


                    _db.ONNET_USER.Add(newuser);
                    _db.SaveChanges();
                        

                        var role = (from ep in _db.ONNET_USER
                                           join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                           where loginViewModel.Username == ep.Username
                                           select new
                                           {
                                               Roles = e.RoleName
                                           });


                        return role.AsQueryable();
                    }
                    else
                    {
                        var role = (from ep in _db.ONNET_USER
                                           join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                           where loginViewModel.Username == ep.Username
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
        public void Update(EditUserViewModel editViewModel)
        {
           
            try
            {
                    var entity = _db.ONNET_USER.FirstOrDefault(u => u.UserId == editViewModel.UserId);
                    if (entity != null)
                    {
                        entity.UserId = editViewModel.UserId;
                        entity.Username = editViewModel.Username;
                        entity.Email = editViewModel.Email;
                        entity.Mobile = editViewModel.Mobile;
                        entity.Department = editViewModel.Department;
                        entity.Title = editViewModel.Title;
                        entity.Status = editViewModel.Status;
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