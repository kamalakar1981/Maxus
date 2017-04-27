using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Maxis.ViewModels;
using Maxis.Services.Abstract;
using System.Web.Configuration;

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
            var ldap = bool.Parse(WebConfigurationManager.AppSettings["LDAPAuthentication"]);
            var userDetails = ValidateUser(loginModel, ldap);
            if (userDetails != null)
                {
                    CreateToken(userDetails);
                }
            return Json(userDetails, JsonRequestBehavior.AllowGet);
        }

        public void LogOff()
        {
            FormsAuthentication.SignOut();
        }
        private void CreateToken(UserDetailsViewModel userModel)
        {
            var userData = new JavaScriptSerializer().Serialize(new UserModel
            {
                Username = userModel.Username
            });
            var authTicket = new FormsAuthenticationTicket(
                     1,
                     userModel.Username,
                     DateTime.Now,
                     DateTime.Now.AddMinutes(1),
                     false,
                     userData);

            var encTicket = FormsAuthentication.Encrypt(authTicket);
            var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            Response.Cookies.Add(faCookie);
        }
        private UserDetailsViewModel ValidateUser(LoginViewModel loginViewModel, bool ldap)
        {
            return _userService.CreateUser(loginViewModel, ldap);
        }

       
    }
}
