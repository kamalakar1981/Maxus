using System.Collections.Generic;
using Maxis.ViewModels;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IExportRepository
    {
        bool ExportToExcel(List<UserViewModel> userViewModel);

        bool ExportToPdf(List<UserViewModel> userViewModel);
    }
}
