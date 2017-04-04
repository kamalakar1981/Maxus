using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.Services.Abstract;
using Maxis.ViewModels;
using System.Collections.Generic;

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
        public EditUserViewModel SelectById(long id)
        {
            return _userRepository.SelectById(id);
        }
        public void EditUser(EditUserViewModel editUserModel)
        {
            _userRepository.Update(editUserModel);
        }
        public LoginViewModel CreateUser(LoginViewModel loginViewModel)
        {
            return _userRepository.Insert(loginViewModel);
        }
    }
}