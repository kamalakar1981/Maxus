using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Maxis.ViewModels;
using Maxis.Services.Abstract;

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
            ValidateUser(loginModel);
            var userDetails = GetDataByUser(loginModel.Username);
            CreateToken(userDetails);
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
                     DateTime.Now.AddMinutes(15),
                     false,
                     userData);

            var encTicket = FormsAuthentication.Encrypt(authTicket);
            var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            Response.Cookies.Add(faCookie);
        }

        private void ValidateUser(LoginViewModel loginViewModel)
        {
             _userService.CreateUser(loginViewModel);
        }

        public UserDetailsViewModel GetDataByUser(string username)
        {
            return _userService.GetDataByUser(username);
        }
    }
}
