using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Maxis.Database;
using Newtonsoft.Json;

namespace Maxis.Controllers
{
    public class MapController : Controller
    {
        private MAXISDEVEntities10 db = new MAXISDEVEntities10();

        // GET: Map/Building
        public JsonResult Buildings()
        {
            return Json(db.ONNET_SRCH_BUILDING.ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/Building/3(building id)
        public JsonResult Building(string id)
        {
            ONNET_SRCH_BUILDING oNNET_SRCH_BUILDING = db.ONNET_SRCH_BUILDING.Find(id);
            if (oNNET_SRCH_BUILDING == null)
            {
                Json(new object[] { new object() });
            }
            return Json(oNNET_SRCH_BUILDING, JsonRequestBehavior.AllowGet);
        }

        // GET: Map/NE
        public JsonResult NE()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.ONNET_SRCH_NE.ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/NETypes
        public JsonResult NETypes()
        {
            return Json(db.ONNET_SRCH_NE.Select(m => m.NE_OT_NAME).Distinct().ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/Cables
        public JsonResult Cables()
        {
            db.Configuration.ProxyCreationEnabled = false;
            return Json(db.ONNET_SRCH_OSP_CABLE.ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/CableTypes
        public JsonResult CableTypes()
        {
            return Json(db.ONNET_SRCH_OSP_CABLE.Select(m => m.Cable_Type).Distinct().ToList(), JsonRequestBehavior.AllowGet);
        }
        
        // GET: Map/CableDetails/3(cable id)
        public JsonResult CableDetails(string id)
        {
            ONNET_SRCH_OSP_CABLE ONNET_SRCH_OSP_CABLE = db.ONNET_SRCH_OSP_CABLE.Find(id);
            if (ONNET_SRCH_OSP_CABLE == null)
            {
                Json(new object[] { new object() });
            }
            return Json(ONNET_SRCH_OSP_CABLE, JsonRequestBehavior.AllowGet);
        }

        // GET: Map/Threshold/3(NE id)
        public JsonResult Threshold(string id)
        {            
            return Json(db.ONNET_SRCH_OSP_THRESHOLD.Select(m => m.NE_ID == id).ToList(), JsonRequestBehavior.AllowGet);
        }

    }
}
