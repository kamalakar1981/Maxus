using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IUserRepository
    {
        List<EditUserViewModel> UserList();
        List<EditUserViewModel> UserById(long id);
        List<UserDetailsViewModel> ValidateUser(LoginViewModel loginViewModel);
        bool Update(EditUserViewModel editUserViewModel);
        UserDetailsViewModel GetDataByUser(string userName);
    }
}
