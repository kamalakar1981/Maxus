using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Maxis.ViewModels;
namespace Maxis.CustomFilters
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {
                var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
                if (authTicket == null) filterContext.Result = new HttpStatusCodeResult(403);
                var serializer = new JavaScriptSerializer();
                var serializeModel = serializer.Deserialize<UserModel>(authTicket.UserData);
                var newUser = new CustomPrincipal(authTicket.Name) { Username = serializeModel.Username };
                HttpContext.Current.User = newUser;
            }
            else
            {
                filterContext.Result = new HttpStatusCodeResult(403);
            }
        }
    }
}