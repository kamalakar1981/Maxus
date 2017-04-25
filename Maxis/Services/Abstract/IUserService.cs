using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Services.Abstract
{
    public interface IUserService
    {
        List<EditUserViewModel> GetAllUsers();
        EditUserViewModel GetUserById(long id);
        bool EditUser(EditUserViewModel editUserViewModel);
        UserDetailsViewModel CreateUser(LoginViewModel loginViewModel, bool ldap);
    }
}
