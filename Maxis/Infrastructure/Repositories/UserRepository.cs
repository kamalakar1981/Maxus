using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Maxis.Database;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.ViewModels;
using System.Security.Cryptography;

namespace Maxis.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MaxisEntities _db = new MaxisEntities();

        public List<EditUserViewModel> UserList()
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
                                  Mobile = ep.Mobile,
                                  Department = ep.Department,
                                  Title = ep.Title,
                                  Status = ep.Status,
                                  Roles = e.RoleName,
                                  RoleId = e.RoleId
                              }).ToList();

                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<EditUserViewModel> UserById(long id)
        {
            try
            {
                var result = from ep in _db.ONNET_USER
                    join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                    where ep.UserId == id
                    select new EditUserViewModel()
                    {
                        UserId = ep.UserId,
                        Username = ep.Username,
                        Email = ep.Email,
                        Mobile = ep.Mobile,
                        Department = ep.Department,
                        Title = ep.Title,
                        Status = ep.Status,
                        Roles = e.RoleName,
                        RoleId = e.RoleId
                    };

                return result.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<UserDetailsViewModel> ValidateUser(LoginViewModel loginViewModel)
        {
            try
            {
                var encyptval = Encrypt(loginViewModel.Password);
                var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == loginViewModel.Username && u.Password == encyptval);

                if (user != null) return GetRoles(loginViewModel);
                var newuser = new ONNET_USER
                {
                    Username = loginViewModel.Username,
                    Password = encyptval,
                    RoleId = (long)Enum.Roles.Normal
                };

                _db.ONNET_USER.Add(newuser);
                _db.SaveChanges();

                return GetRoles(loginViewModel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(EditUserViewModel editViewModel)
        {
            try
            {
                var entity = _db.ONNET_USER.FirstOrDefault(u => u.UserId == editViewModel.UserId);
                if (entity != null)
                {
                    entity.UserId = editViewModel.UserId;
                    entity.Email = editViewModel.Email;
                    entity.Mobile = editViewModel.Mobile;
                    entity.Department = editViewModel.Department;
                    entity.Title = editViewModel.Title;
                    entity.Status = editViewModel.Status;
                    entity.RoleId = editViewModel.RoleId;
                }

                _db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public UserDetailsViewModel GetDataByUser(string username)
        {
            var user = (from ep in _db.ONNET_USER
                        join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                        where ep.Username == username
                        select new UserDetailsViewModel()
                        {
                            UserId = ep.UserId,
                            Username = ep.Username,
                            Email = ep.Email,
                            Mobile = ep.Mobile,
                            Department = ep.Department,
                            Title = ep.Title,
                            Status = ep.Status,
                            Roles = e.RoleName
                        }).Single();
            return user;
        }

        public static string Encrypt(string password)
        {
            var encoding = new System.Text.ASCIIEncoding();
            string result;
            var keyByte = encoding.GetBytes(password);
            var messageBytes = encoding.GetBytes(ConfigurationManager.AppSettings["Hashkey"]);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                var hashmessage = hmacsha256.ComputeHash(messageBytes);
                result = Convert.ToBase64String(hashmessage);
            }

            return result;
        }

        public List<UserDetailsViewModel> GetRoles(LoginViewModel loginViewModel)
        {
            var role = from ep in _db.ONNET_USER
                join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                where loginViewModel.Username == ep.Username
                select new UserDetailsViewModel()
                {
                    Username = ep.Username,
                    Roles = e.RoleName
                };
            return role.ToList();
        }
    }
}