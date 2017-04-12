using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Services.Abstract
{
    public interface IUserService
    {
        List<EditUserViewModel> GetAllUsers();
        List<EditUserViewModel> GetUserById(long id);
        bool EditUser(EditUserViewModel editUserViewModel);
        List<UserDetailsViewModel> CreateUser(LoginViewModel loginViewModel);
        UserDetailsViewModel GetDataByUser(string username);
    }
}
