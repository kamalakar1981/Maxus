using Maxis.Database;
using Maxis.Repository;
using Maxis.Services.Abstract;
using Maxis.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public List<ONNET_USER> GetAllUsers()
        {
            return _userRepository.SelectAll();
        }

        public List<ONNET_USER> SelectById(long id)
        {
            return _userRepository.SelectByID(id);
        }


        public void EditUser(ONNET_USER obj)
        {
            _userRepository.Update(obj);
        }
    }
}