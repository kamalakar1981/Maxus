using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Maxis.Services.Abstract;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.ViewModels;

namespace Maxis.Services
{
    public class ExportService: IExportService
    {

        private readonly IExportRepository _exportRepository;

        public ExportService(IExportRepository exportRepository)
        {
            _exportRepository = exportRepository;
        }

        public bool ExportToExcel(List<UserViewModel> userViewModel) { return _exportRepository.ExportToExcel(userViewModel); }

        public bool ExportToPDF(List<UserViewModel> userViewModel) { return _exportRepository.ExportToPDF(userViewModel); }
    }
}