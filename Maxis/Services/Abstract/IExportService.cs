using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Maxis.Services.Abstract;
using System.Threading.Tasks;
using Maxis.ViewModels;

namespace Maxis.Services.Abstract
{
    public interface IExportService
    {
        bool ExportToExcel(List<UserViewModel> model);

        bool ExportToPDF(List<UserViewModel> model);
    }
}
