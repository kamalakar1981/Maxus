using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Services.Abstract
{
    public interface IUserService
    {
        List<EditUserViewModel> GetAllUsers();
        EditUserViewModel SelectById(long id);
        void EditUser(EditUserViewModel editUserViewModel);
        LoginViewModel CreateUser(LoginViewModel loginViewModel);
    }
}
