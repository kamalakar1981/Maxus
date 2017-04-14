using Maxis.Database;
using System;
using System.Web.Mvc;
using System.Web;

namespace Maxis.CustomFilters
{
    public class ExceptionHandlerAttribute : FilterAttribute, IExceptionFilter
    {
        private readonly MaxisEntities _db = new MaxisEntities();
        public void OnException(ExceptionContext filterContext)
        {
            if (!filterContext.ExceptionHandled)
            {
                var exceptionDetails = new EXCEPTIONLOG
                {
                    EXCEPTION_MESSAGE = filterContext.Exception.Message,
                    CONTROLLER_NAME = filterContext.RouteData.Values["Controller"].ToString(),
                    ACTION_NAME = filterContext.RouteData.Values["Action"].ToString(),
                    STACKTRACE = "Inner Exception: " + filterContext.Exception.InnerException + "\nStacktrace: " + filterContext.Exception.StackTrace,
                    LOG_TIME = DateTime.Now,
                    USERNAME = HttpContext.Current.User.Identity.Name

                };
                _db.EXCEPTIONLOGs.Add(exceptionDetails);
                _db.SaveChanges();
                filterContext.ExceptionHandled = true;
            }
        }
    }
}