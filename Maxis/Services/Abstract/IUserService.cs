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
        List<ONNET_USER> GetAllUsers();
        List<ONNET_USER> SelectById(long id);
        void EditUser(ONNET_USER obj);
    }
}
