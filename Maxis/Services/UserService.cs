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
            return _userRepository.UserList();
        }
        public EditUserViewModel GetUserById(long id)
        {
            return _userRepository.UserById(id);
        }
        public bool EditUser(EditUserViewModel editUserModel)
        {
            return _userRepository.Update(editUserModel);
        }
        public UserDetailsViewModel CreateUser(LoginViewModel loginViewModel, bool ldap)
        {
            return _userRepository.ValidateUser(loginViewModel, ldap);
        }
    }
}