using System.Web.Mvc;
using Maxis.Services.Abstract;
using Maxis.ViewModels;
using System.Data.Spatial;

namespace Maxis.Controllers
{
    public class MapController : BaseController
    {
        private readonly IMapService _mapService;

        public MapController(IMapService mapService)
        {
            _mapService = mapService;
        }

        /// <summary>
        /// Load default values for the map components
        /// </summary>
        /// <param name="pointViewModel"></param>
        /// <returns></returns>
        public JsonResult DefaultValues(PointViewModel pointViewModel)
        {
            if (pointViewModel.SearchPoint != null)
            {
                return Json(_mapService.GetDefaultValues(DbGeography.FromText(pointViewModel.SearchPoint)), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        }


        // GET: Map/LRD
        //show LRD 
        public JsonResult LRD(string buildingId)
        {
            if (buildingId != null)
            {
                return Json(_mapService.GetLrdValues(buildingId), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        }


        // GET: MAP/NENames
        //show NENames for NENames dropdown based on lrd
        public JsonResult NENames(PointViewModel pointViewModel)
        {
            if (pointViewModel.SearchPoint != null)
            {
                return Json(_mapService.GetNeNames(DbGeography.FromText(pointViewModel.SearchPoint), pointViewModel.Range, pointViewModel.Lrd), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(),JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Map/Threshold/nename(NE name)
        //Show threshold information
        public JsonResult Threshold(string NEName)
        {
            if (NEName != null)
            {
                return Json(_mapService.GetThresholdDetails(NEName), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        } 
                      
        // GET: Map/CableTypes
        //show cable information
        public JsonResult Cables(PointViewModel pointViewModel)
        {
            if (pointViewModel.SearchPoint != null)
            {
                return Json(_mapService.GetCables(DbGeography.FromText(pointViewModel.SearchPoint), pointViewModel.Range), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        }

        // GET: Map/Building
        //Show buildings based on nename
        public JsonResult Buildings(PointViewModel pointViewModel)
        {
            if (pointViewModel.SearchPoint != null)
            {
                return Json(_mapService.GetBuildingDetails(DbGeography.FromText(pointViewModel.SearchPoint), pointViewModel.Range), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        }

        //GET: Map/Structures
        //Show cable structures 
        public JsonResult Structures(PointViewModel pointViewModel)
        {
            if (pointViewModel.SearchPoint != null)
            {
                return Json(_mapService.GetStructureDetails(DbGeography.FromText(pointViewModel.SearchPoint), pointViewModel.Range, pointViewModel.CableId), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new EmptyResult(), JsonRequestBehavior.AllowGet);
            }
        }


    }
}
