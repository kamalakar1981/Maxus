using System;
using System.Collections.Generic;
using System.Linq;
using Maxis.Database;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.ViewModels;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace Maxis.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MaxisEntities _db = new MaxisEntities();
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
                            Mobile = ep.Mobile,
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
        public EditUserViewModel SelectById(long id)
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
                            Roles = e.RoleName
                        }).Single();
                     
                    return (result); 
            }
            catch (Exception )
            {
                throw;
            }
        }
        public LoginViewModel Insert(LoginViewModel loginViewModel)
        {
            try
            {
                var user = _db.ONNET_USER.FirstOrDefault(u => u.Username == loginViewModel.Username && u.Password == loginViewModel.Password);

                    if (user == null)
                    {
                        var newuser = new ONNET_USER
                        {
                            Username = loginViewModel.Username,
                            //Password = Encrypt(new  LoginViewModel
                            //{
                                Password =loginViewModel.Password,
                            //}),
                            Email = null,
                            Mobile = null,
                            Department = null,
                            Title = null,
                            Status = null,
                            RoleId = 3
                        };
                        using (MaxisEntities _db = new MaxisEntities())
                        {
                               _db.ONNET_USER.Add(newuser);
                               _db.SaveChanges();
                        }
                        var role = (from ep in _db.ONNET_USER
                            join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                            where loginViewModel.Username == ep.Username
                            select new LoginViewModel()
                            {
                                Roles = e.RoleName,
                                RoleId = e.RoleId
                            }).Single();

                    return role;
                    }
                    else
                    {
                        var role = (from ep in _db.ONNET_USER
                            join e in _db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                            where loginViewModel.Username == ep.Username
                            select new LoginViewModel()
                            {
                                Roles = e.RoleName,
                                RoleId = e.RoleId
                            }).Single();
                    return role;
                    }
            }
            catch (Exception)
            {
                throw;
            }
        }
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

        public string Encrypt(LoginViewModel loginModel)
        {
            const string encryptionKey = "MAKV2SPBNI99212";
            var clearBytes = Encoding.Unicode.GetBytes(loginModel.Password);
            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(encryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    loginModel.Password = Convert.ToBase64String(ms.ToArray());
                }
            }
            return loginModel.Password;
        }
    }
}