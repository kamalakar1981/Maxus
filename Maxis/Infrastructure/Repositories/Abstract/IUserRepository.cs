using Maxis.Database;
using Maxis.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Maxis.Repository
{
    public interface IUserRepository
    {
        List<EditUserViewModel> SelectAll();
        List<EditUserViewModel> SelectByID(long id);
        void Insert(LoginViewModel model);
        void Update(EditUserViewModel model);
        void Save();
    }
}
