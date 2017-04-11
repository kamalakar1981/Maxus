using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IUserRepository
    {
        List<EditUserViewModel> SelectAll();
        List<EditUserViewModel> SelectById(long id);
        List<UserDetailsViewModel> ValidateUser(LoginViewModel loginViewModel);
        bool Update(EditUserViewModel editUserViewModel);
        UserDetailsViewModel SelectByUser(string username);
    }
}
