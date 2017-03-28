using Maxis.Database;
using Maxis.Interfaces;
using Maxis.Repository;
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

namespace Maxis.Controllers
{
    public class LoginController : Controller
    {
        private MaxisEntities db = new MaxisEntities();
        private IUserRepository repository = null;

        public virtual ONNET_USER user { get; set; }
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public bool LdapLogin(string Username, string Password)
        {
            //return true;
            bool functionReturnValue = false;
            var server = WebConfigurationManager.AppSettings["Ldapserver"];
            var ldapUser = WebConfigurationManager.AppSettings["Ldapusername"];
            var model1 = new LoginViewModel
            {
                Password = Password,
                Username = Username
            };
            var ldapPassword = WebConfigurationManager.AppSettings["Ldappassword"];
            try
            {

                using (PrincipalContext pCtx = new PrincipalContext(ContextType.ApplicationDirectory, server, "O=users", ContextOptions.SimpleBind, ldapUser, ldapPassword))
                {
                    functionReturnValue = pCtx.ValidateCredentials(Username, Password);
                }

                if (functionReturnValue == true)
                {
                    Validate(model1);
                }
                return functionReturnValue;

            }
            catch (Exception)
            {

                return false;
            }
        }
        public void LogOff()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
        }

        [HttpPost]
        private JsonResult Validate(LoginViewModel model)
        {
            if (LdapLogin(model.Username, model.Password))
            {
                var user = db.ONNET_USER.Where(u => u.Username == model.Username && u.Password == model.Password).FirstOrDefault();

                if (user == null)
                {
                    var newuser = new ONNET_USER 
                    {
                        Username = model.Username,
                        Password = model.Password,
                        Email = null,
                        Mobile = null,
                        Department = null,
                        Title = null,
                        Status = null,
                        RoleId = 1
                    };
                    using (var context = new MaxisEntities())
                    {
                        context.ONNET_USER.Add(newuser);
                        context.SaveChanges();
                    }

                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                serializeModel.UserId = Convert.ToInt32(user.UserId);
                serializeModel.Username = user.Username;
                serializeModel.Password = user.Password;

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

                return Json(new
                {
                    redirectUrl = Url.Action("Index", "Home"),
                    isRedirect = true
                });

            }

            else { return Json(false, JsonRequestBehavior.AllowGet); }
        }
    }
}
