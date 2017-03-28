using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Maxis.Database;
using Maxis.Repository;
using Newtonsoft.Json;
using Maxis.Services.Abstract;
using Maxis.Services;
using Maxis.ViewModels;

namespace Maxis.Controllers
{
    public class USERController : Controller
    {
        private MaxisEntities db = new MaxisEntities();

        private readonly IUserService _userService;

        public USERController(IUserService userService)
        {
            _userService = userService;
        }
        // GET: USER/UsersList
        public JsonResult UsersList()
        {
            return Json(_userService.GetAllUsers(), JsonRequestBehavior.AllowGet);
        }

        // GET: USER/Edit/5
        public JsonResult Edit(long id)
        {
            return Json(_userService.SelectById(id), JsonRequestBehavior.AllowGet);
        }

        // PUT: USER/EditUser/2
        [HttpPost]

        public void EditUser(ONNET_USER onnet_user)
        {
            _userService.EditUser(onnet_user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
