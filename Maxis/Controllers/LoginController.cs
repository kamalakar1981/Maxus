using Maxis.Database;
using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;
using Maxis.ViewModels;
using Maxis.Services.Abstract;
using Maxis.ViewModels;

namespace Maxis.Controllers
{
    public class LoginController : Controller
    {
        private MaxisEntities db = new MaxisEntities();
        

        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }
        public JsonResult LdapLogin(string userName, string password)
        {
            bool functionReturnValue = false;
            var server = WebConfigurationManager.AppSettings["Ldapserver"];
            var ldapUser = WebConfigurationManager.AppSettings["Ldapusername"];
            var ldapPassword = WebConfigurationManager.AppSettings["Ldappassword"];
           
            try
            {

                using (PrincipalContext pCtx = new PrincipalContext(ContextType.ApplicationDirectory, server, "O=users", ContextOptions.SimpleBind, ldapUser, ldapPassword))
                {
                    functionReturnValue = pCtx.ValidateCredentials(userName, password);
                }

                if (functionReturnValue == true)
                {
                    var roles = Validate(new LoginViewModel
                    {
                        Password = password,
                        Username = userName
                    });
                    return Json(roles, JsonRequestBehavior.AllowGet);
                }
                

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

            return Json(functionReturnValue, JsonRequestBehavior.AllowGet);
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
            CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
            serializeModel.Username = model.Username;
            serializeModel.Password = model.Password;

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            string userData = serializer.Serialize(serializeModel);

            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                     1,
                     model.Username,
                     DateTime.Now,
                     DateTime.Now.AddMinutes(15),
                     true,
                     userData);

            string encTicket = FormsAuthentication.Encrypt(authTicket);
            HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
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
