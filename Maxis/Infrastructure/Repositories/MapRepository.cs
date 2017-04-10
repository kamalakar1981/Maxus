using System;
using System.Collections.Generic;
using System.Linq;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.Database;
using Maxis.ViewModels;
using AutoMapper.QueryableExtensions;
using System.Data.Spatial;
using System.Data.SqlClient;

namespace Maxis.Infrastructure.Repositories
{
    public class MapRepository : IMapRepository
    {
        private readonly MaxisEntities _db = new MaxisEntities();

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchPoint"></param>
        /// <param name="range"></param>
        /// <returns></returns>
        public List<LrdViewModel> GetLrdValues(DbGeography searchPoint, int range)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range)
            };
            //SqlParameter[] parameters = parameterList.ToArray();
            var result = _db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range", parameterList.ToArray()).ToList();
            return result.Select(m => new LrdViewModel {LrdName = m.LRD, GeodataValue = m.GEODATA.AsText()}).GroupBy(m => m.LrdName).Select(m => m.First()).ToList();            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchPoint"></param>
        /// <param name="range"></param>
        /// <param name="lrd"></param>
        /// <returns></returns>
        public List<NeViewModel> GetNeNames(DbGeography searchPoint, int range, string lrd)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range),
                new SqlParameter("@LRD", lrd)
            };
            //SqlParameter[] parameters = parameterList.ToArray();
            var result = _db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range and LRD=@LRD", parameterList.ToArray()).Select(g => new NeViewModel
                {
                    NetworkElementId = g.NE_ID,
                    NetworkElementName = g.NE_NAME,
                    NetworkElementType = g.NE_OT_NAME,
                    Role = g.ROLE
                }).ToList();
            return result;            
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="neName"></param>
        /// <returns></returns>
        public List<ThresholdViewModel> GetThresholdDetails(string neName)
        {
            return _db.ONNET_SRCH_OSP_THRESHOLD.Where(m => m.NE_NAME.ToUpper() == neName.ToUpper()).ProjectTo<ThresholdViewModel>().ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchPoint"></param>
        /// <param name="range"></param>
        /// <returns></returns>
        public List<CableViewModel> GetCables(DbGeography searchPoint, int range)
        {
            try
            {
                return _db.ONNET_SRCH_OSP_CABLE.Select(c => new CableViewModel
                {
                    CableId = c.CABLE_ID,
                    CableName = c.CABLE_NAME,
                    CableType = c.CABLE_TYPE,
                    NumberOfFibers = c.NUM_OF_FIBERS,
                    //Geodata = c.GEODATA.AsText()
                }).ToList();
            }
            catch { throw new Exception("An error occured while loading cable information"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="cableType"></param>
        /// <returns></returns>
        public List<CableViewModel> GetCableDetails(string cableType)
        {
            return _db.ONNET_SRCH_OSP_CABLE.Where(m => m.CABLE_TYPE.ToUpper() == cableType.ToUpper()).ProjectTo<CableViewModel>().ToList();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="searchPoint"></param>
        /// <param name="range"></param>
        /// <returns></returns>
        public List<BuildingViewModel> GetBuildingDetails(DbGeography searchPoint, int range)
        {
            _db.Configuration.ProxyCreationEnabled = false;
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range)
            };
            //SqlParameter[] parameters = parameterList.ToArray();
            //_db.ONNET_SRCH_BUILDING.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
            //    "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
            //    "as distance FROM ONNET_SRCH_BUILDING) t WHERE distance <= @range", parameterList.ToArray()).Join(_db.ONNET_SRCH_NE_ABE, b => b.BUILDING_ID, a => a.ABE_ID,
            //    (b, a) => new { b, a }).Join(_db.ONNET_SRCH_NE, n => n.a.NE_ID, ne => ne.NE_ID, (n, ne) => new { n, ne }).Select(m => new BuildingViewModel
            //    {
            //        BuildingID = 
            //        BuildingName =
            //        Street =
            //        City =
            //        State =
            //        Geodata =
            //        NetworkElementID =
            //        LRD =
            //        //UserName = m.r.u.UserName,
            //        //RoleName = m.ro.RoleName
            //    });
            return _db.ONNET_SRCH_NE_ABE.Where(m => m.NE_NAME.ToUpper() == " ").ProjectTo<BuildingViewModel>().ToList();
        }

        
    }
}