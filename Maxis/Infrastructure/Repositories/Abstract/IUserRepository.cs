using Maxis.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IUserRepository
    {
        List<EditUserViewModel> SelectAll();
        List<EditUserViewModel> SelectById(long id);
        IQueryable Insert(LoginViewModel model);
        void Update(EditUserViewModel model);
        
    }
}
