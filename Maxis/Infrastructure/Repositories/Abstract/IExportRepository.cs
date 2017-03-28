using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maxis.ViewModels;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IExportRepository
    {
        bool ExportToExcel(List<UserViewModel> model);

        bool ExportToPDF(List<UserViewModel> model);
    }
}
