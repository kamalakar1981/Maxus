using System.Collections.Generic;
using System.Web.Mvc;
using Maxis.Services.Abstract;
using Maxis.ViewModels;

namespace Maxis.Controllers
{
    public class ExportController : Controller
    {
        private readonly IExportService _exportService;

        public ExportController(IExportService exportService)
        {
            _exportService = exportService;
        }
        // GET: Export
        public bool ExportExcel(List<UserViewModel> userViewModel)
        {
            return _exportService.ExportToExcel(userViewModel);
        }

        // GET: Export/Details/5
        public bool ExportPDF(List<UserViewModel> userViewModel)
        {
            return _exportService.ExportToPdf(userViewModel);
        }        
    }
}
