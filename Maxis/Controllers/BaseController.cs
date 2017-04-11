using System.Web.Mvc;
using Maxis.ViewModels;

namespace Maxis.Controllers
{
    public class BaseController : System.Web.Mvc.Controller
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