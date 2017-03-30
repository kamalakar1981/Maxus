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
using Maxis.Services.Abstract;

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

        public virtual ONNET_USER user { get; set; }
        // GET: Login
        public ActionResult Index()
        {
            return View();
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

       
        private IQueryable Validate(LoginViewModel model)
        {
                var user = db.ONNET_USER.Where(u => u.Username == model.Username && u.Password == model.Password).FirstOrDefault();

                if (user == null)
                {
                    CreateUser(model);
                }
                var role = (from ep in db.ONNET_USER
                                join e in db.ONNET_USERROLE on ep.RoleId equals e.RoleId
                                where model.Username == ep.Username
                                select new
                                {
                                    Roles = e.RoleName
                                });
                
            CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
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
            return role;
        }
        //POST:Login/CreateUser/
        [HttpPost]

        private void CreateUser(LoginViewModel model)
        {
            _userService.CreateUser(model);
        }
    }
}
