using Maxis.Database;
using System;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Maxis.ViewModels;
using Maxis.Services.Abstract;
using System.Web.SessionState;

namespace Maxis.Controllers
{
    public class LoginController : Controller
    {

        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }
        public JsonResult Login(LoginViewModel loginModel)
        {
            Session["username"] = loginModel.Username;
            var roles = Authentication(new LoginViewModel
            {
                Password = loginModel.Password,
                Username = loginModel.Username
            });
            Validation(new LoginViewModel
            {
                Password = loginModel.Password,
                Username = loginModel.Username
            });
            return Json(new RoleViewModel() { RoleId = roles.RoleId,Roles = roles.Roles}, JsonRequestBehavior.AllowGet);
        }
        public void LogOff()
        {
            FormsAuthentication.SignOut();
            Session.Abandon();
            Session.Clear();
            Session["username"] = null;
        }

        private LoginViewModel Authentication(LoginViewModel loginViewModel)
        {
            var roles1 = CreateUser(loginViewModel);
            return roles1;
        }

        private void Validation(LoginViewModel loginViewModel)
        {
            var serializeModel = new CustomPrincipalSerializeModel
            {
                Username = loginViewModel.Username,
                Password = loginViewModel.Password
            };
            var serializer = new JavaScriptSerializer();
            var userData = serializer.Serialize(serializeModel);
            var authTicket = new FormsAuthenticationTicket(
                     1,
                     loginViewModel.Username,
                     DateTime.Now,
                     DateTime.Now.AddMinutes(15),
                     true,
                     userData);

            var encTicket = FormsAuthentication.Encrypt(authTicket);
            var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            Response.Cookies.Add(faCookie);
        }
        [HttpPost]
        private LoginViewModel CreateUser(LoginViewModel loginViewModel)
        {
            return _userService.CreateUser(loginViewModel);
        }
    }
}
