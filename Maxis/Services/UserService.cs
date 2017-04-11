using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.Services.Abstract;
using Maxis.ViewModels;
using System.Collections.Generic;
using System;

namespace Maxis.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public List<EditUserViewModel> GetAllUsers()
        {
            return _userRepository.SelectAll();
        }
        public List<EditUserViewModel> SelectById(long id)
        {
            return _userRepository.SelectById(id);
        }
        public bool EditUser(EditUserViewModel editUserModel)
        {
            return _userRepository.Update(editUserModel);
        }
        public List<UserDetailsViewModel> CreateUser(LoginViewModel loginViewModel)
        {
            return _userRepository.ValidateUser(loginViewModel);
        }

        public UserDetailsViewModel SelectByUser(string username)
        {
            return _userRepository.SelectByUser(username);
        }
    }
}