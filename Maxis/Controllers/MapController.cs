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
        private MAXISDEVEntities14 db = new MAXISDEVEntities14();

        // GET: Map/LRD
        //show LRD for NEtypes dropdown
        public JsonResult LRD()
        {
            return Json(db.ONNET_SRCH_NE.Select(m => m.LRD).Distinct().ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: MAP/NENAMES?LRD=AGNI
        //show NENames for NENames dropdown based on lrd
        public JsonResult NENames(string LRD)
        {
            return Json(db.ONNET_SRCH_NE.Where(m => m.LRD.ToUpper() == LRD.ToUpper()).Select(m => m.NE_NAME).ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/CableTypes
        //show cabletypes for cable type dropdown
        public JsonResult CableTypes()
        {
            return Json(db.ONNET_SRCH_OSP_CABLE.Select(m => m.CABLE_TYPE).Distinct().ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/CableDetails
        //show cablenames, geodata for cable names dropdown based on cable type
        public JsonResult CableDetails(string cableType)
        {
            return Json(db.ONNET_SRCH_OSP_CABLE.Where(m => m.CABLE_TYPE.ToUpper() == cableType.ToUpper()).ToList(), JsonRequestBehavior.AllowGet);
        }

        // GET: Map/Building/nename(NEname)
        //Show buildings based on nename
        public JsonResult Building(string NEName)
        {
            return Json(db.ONNET_SRCH_NE_ABE.Where(m => m.NE_NAME.ToUpper() == NEName.ToUpper()).ToList(), JsonRequestBehavior.AllowGet);
        }


        // GET: Map/Threshold/nename(NE name)
        //Show threshold info on tower click
        public JsonResult Threshold(string NEName)
        {
            return Json(db.ONNET_SRCH_OSP_THRESHOLD.Select(m => m.NE_NAME.ToUpper() == NEName.ToUpper()).ToList(), JsonRequestBehavior.AllowGet);
        }

    }
}
