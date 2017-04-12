using System.Web.Mvc;
using Maxis.ViewModels;

namespace Maxis.Controllers
{
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