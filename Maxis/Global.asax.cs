using Maxis.App_Start;
using Maxis.ViewModels;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace Maxis
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            DependencyConfig.RegisterDependencyResolvers();
            MappingConfig.RegisterMaps();
        }

        protected void Application_PostAuthenticateRequest(object sender, EventArgs e)
        {
            var authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];

            if (authCookie == null) return;
            var authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            var serializer = new JavaScriptSerializer();
            if (authTicket == null) return;
            var serializeModel = serializer.Deserialize<UserModel>(authTicket.UserData);
            var newUser = new CustomPrincipal(authTicket.Name)
            {
                Username = serializeModel.Username,
            };
            HttpContext.Current.User = newUser;
        }
    }
}
