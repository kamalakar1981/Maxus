using System.Web.Mvc;
using Maxis.ViewModels;
using Maxis.CustomFilters;

namespace Maxis.Controllers
{
    [ExceptionHandler]
    public class BaseController : Controller
    {
        protected new virtual CustomPrincipal User
        {
            get
            {
                return HttpContext.User as CustomPrincipal;
            }
        }
    }
}