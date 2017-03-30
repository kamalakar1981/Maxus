using Maxis.ViewModels;
using System;
using System.Collections.Generic;

namespace Maxis.Services.Abstract
{
    public interface IUserService
    {
        List<EditUserViewModel> GetAllUsers();
        List<EditUserViewModel> SelectById(long id);
        void EditUser(EditUserViewModel model);
        void CreateUser(LoginViewModel model);
    }
}
