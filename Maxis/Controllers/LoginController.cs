using Maxis.Database;
using System;
using System.Web;
using System.Web.Configuration;
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
        public JsonResult LdapLogin(string userName, string password)
        {
            var server = WebConfigurationManager.AppSettings["Ldapserver"];
            var ldapUser = WebConfigurationManager.AppSettings["Ldapusername"];
            var ldapPassword = WebConfigurationManager.AppSettings["Ldappassword"];
           
            try
            {
                    var roles = Validate(new LoginViewModel
                    {
                        Password = password,
                        Username = userName
                    });
                return Json(roles, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message.ToString(), JsonRequestBehavior.AllowGet);
            }
           
        }
        public void LogOff()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
        }

       
        private JsonResult Validate(LoginViewModel model)
        {
            if (model != null)
            {
                CreateUser(model);
            }

            var serializeModel = new CustomPrincipalSerializeModel
            {
                Username = model.Username,
                Password = model.Password
            };


            var serializer = new JavaScriptSerializer();

            var userData = serializer.Serialize(serializeModel);

            var authTicket = new FormsAuthenticationTicket(
                     1,
                     model.Username,
                     DateTime.Now,
                     DateTime.Now.AddMinutes(15),
                     true,
                     userData);

            var encTicket = FormsAuthentication.Encrypt(authTicket);
            var faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            Response.Cookies.Add(faCookie);
            return Json(faCookie, JsonRequestBehavior.AllowGet);
        }

        //POST:Login/CreateUser/
        [HttpPost]
        private void CreateUser(LoginViewModel model)
        {
            _userService.CreateUser(model);
        }
    }
}
