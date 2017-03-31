﻿
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Maxis.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetUser()
        {
            var list = new List<string>();

            list.Add("Hello!");

            return Json(list, JsonRequestBehavior.AllowGet);
        }
    }
}