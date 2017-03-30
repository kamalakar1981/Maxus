using Maxis.Database;
using Maxis.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
