
using System.Web.Mvc;
using Maxis.Services.Abstract;
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

        public void UpdateUser(EditUserViewModel model)
        {
            _userService.EditUser(model);
        }
    }
}
