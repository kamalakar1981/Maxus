using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Maxis.Database;

namespace Maxis.Controllers
{
    public class ONNET_USERController : Controller
    {
        private MAXISDEVEntities10 db = new MAXISDEVEntities10();

        // GET: ONNET_USER/Users
        public JsonResult Users()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.ONNET_USER.ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: ONNET_USER/Users1/5(user id)
        public JsonResult Users1(long? id)
        {
            //if (id == null)
            //{
            //    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            //}
            db.Configuration.ProxyCreationEnabled = false;
            ONNET_USER oNNET_USER = db.ONNET_USER.Find(id);
            if (oNNET_USER == null)
            {
                Json(new object[] { new object() });
            }
            return Json(oNNET_USER, JsonRequestBehavior.AllowGet);
        }

        // GET: ONNET_USER/Create
        public ActionResult Create()
        {
            ViewBag.RoleId = new SelectList(db.ONNET_USERROLE, "RoleId", "RoleName");
            return View();
        }

        // POST: ONNET_USER/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "UserId,Username,Password,Email,DateCreated,DateModified,RoleId")] ONNET_USER oNNET_USER)
        {
            if (ModelState.IsValid)
            {
                db.ONNET_USER.Add(oNNET_USER);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.RoleId = new SelectList(db.ONNET_USERROLE, "RoleId", "RoleName", oNNET_USER.RoleId);
            return View(oNNET_USER);
        }

        // GET: ONNET_USER/Edit/5
        public JsonResult Edit(long? id)
        {
            if (id == null)
            {
                return Json(HttpStatusCode.BadRequest);
            }
            ONNET_USER oNNET_USER = db.ONNET_USER.Find(id);
            if (oNNET_USER == null)
            {
                return Json(HttpStatusCode.BadRequest);
            }
            ViewBag.RoleId = new SelectList(db.ONNET_USERROLE, "RoleId", "RoleName", oNNET_USER.RoleId);
            return Json(oNNET_USER);
        }

        // POST: ONNET_USER/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "UserId,Username,Password,Email,DateCreated,DateModified,RoleId")] ONNET_USER oNNET_USER)
        {
            if (ModelState.IsValid)
            {
                db.Entry(oNNET_USER).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.RoleId = new SelectList(db.ONNET_USERROLE, "RoleId", "RoleName", oNNET_USER.RoleId);
            return Json(oNNET_USER);
        }

        // GET: ONNET_USER/Delete/5
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ONNET_USER oNNET_USER = db.ONNET_USER.Find(id);
            if (oNNET_USER == null)
            {
                return HttpNotFound();
            }
            return View(oNNET_USER);
        }

        // POST: ONNET_USER/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            ONNET_USER oNNET_USER = db.ONNET_USER.Find(id);
            db.ONNET_USER.Remove(oNNET_USER);
            db.SaveChanges();
            return RedirectToAction("Index");
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
