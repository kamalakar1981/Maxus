using System;
using System.Collections.Generic;
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
                              select new EditUserViewModel
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

        public EditUserViewModel UserById(long id)
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
                                  Mobile = ep.Mobile,
                                  Department = ep.Department,
                                  Title = ep.Title,
                                  Status = ep.Status,
                                  Roles = e.RoleName,
                                  RoleId = e.RoleId
                              }).FirstOrDefault();

                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public UserDetailsViewModel ValidateUser(LoginViewModel loginViewModel, bool ldap)
        {
            try
            {
                if (ldap)
                {
                    var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == loginViewModel.Username);
                    if (user != null) return GetRoles(loginViewModel).FirstOrDefault();
                    var salt = CreateSalt((int)Enum.CreateSalt.Size);
                    var encyptval = Encrypt(loginViewModel.Password, salt);
                    var newuser = new ONNET_USER
                    {
                        Username = loginViewModel.Username,
                        Password = salt,
                        RoleId = (long)Enum.Roles.Normal,
                        PasswordHash = encyptval
                    };

                    _db.ONNET_USER.Add(newuser);
                    _db.SaveChanges();

                   return GetRoles(loginViewModel).FirstOrDefault();
                }
                else
                {
                    var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == loginViewModel.Username);
                    if (user != null)
                    {
                        var generatedSalt = GetSalt(loginViewModel.Username);
                        var hashedPassword = Encrypt(loginViewModel.Password, generatedSalt);
                        var verifyUser =
                            _db.ONNET_USER.FirstOrDefault(
                                u => u.Username == loginViewModel.Username && u.PasswordHash == hashedPassword);
                        return verifyUser != null ? GetRoles(loginViewModel).FirstOrDefault() : null;
                    }
                    else
                    {
                        return null;
                    }
                }
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

        public static string Encrypt(string password, string salt)
        {
            var encoding = new System.Text.ASCIIEncoding();
            string result;
            var keyByte = encoding.GetBytes(password);
            var messageBytes = encoding.GetBytes(salt);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                var hashmessage = hmacsha256.ComputeHash(messageBytes);
                result = Convert.ToBase64String(hashmessage);
            }

            return result;
        }

        public IQueryable<UserDetailsViewModel> GetRoles(LoginViewModel loginViewModel)
        {
            var role = from ep in _db.ONNET_USER
                       join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                       where loginViewModel.Username == ep.Username
                       select new UserDetailsViewModel()
                       {
                           Username = ep.Username,
                           Roles = e.RoleName,
                       };
            return role;
        }

        public static string CreateSalt(int size)
        {
            var random = new RNGCryptoServiceProvider();
            var salt = new byte[size];
            random.GetBytes(salt);
            return Convert.ToBase64String(salt);
        }
        public string GetSalt(string username)
        {
            var salt = from ep in _db.ONNET_USER   
            select ep.Password;   
            return salt.FirstOrDefault();
        }
    }
}