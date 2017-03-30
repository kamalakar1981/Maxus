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
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
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

        public void EditUser(EditUserViewModel model)
        {
            _userService.EditUser(model);
        }
    }
}
