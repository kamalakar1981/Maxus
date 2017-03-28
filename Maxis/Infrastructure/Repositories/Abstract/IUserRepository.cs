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
        List<ONNET_USER> SelectAll();
        List<ONNET_USER> SelectByID(long id);
        void Insert(ONNET_USER obj);
        void Update(ONNET_USER obj);
        void Save();
    }
}
