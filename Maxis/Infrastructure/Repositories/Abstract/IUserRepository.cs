using Maxis.ViewModels;
using System.Collections.Generic;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IUserRepository
    {
        List<EditUserViewModel> SelectAll();
        EditUserViewModel SelectById(long id);
        LoginViewModel Insert(LoginViewModel loginViewModel);
        void Update(EditUserViewModel editUserViewModel);  
    }
}
