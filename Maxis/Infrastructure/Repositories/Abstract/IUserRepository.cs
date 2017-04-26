using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IUserRepository
    {
        List<EditUserViewModel> UserList();
        EditUserViewModel UserById(long id);
        UserDetailsViewModel ValidateUser(LoginViewModel loginViewModel, bool ldap);
        bool Update(EditUserViewModel editUserViewModel);
    }
}
