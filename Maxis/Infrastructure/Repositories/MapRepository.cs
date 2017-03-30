using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.Database;
using Maxis.ViewModels;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Data.Spatial;
using System.Data.SqlClient;

namespace Maxis.Infrastructure.Repositories
{
    public class MapRepository : IMapRepository
    {
        private MaxisEntities db = new MaxisEntities();

        public MapRepository() { }

        public List<LrdViewModel> getLRDValues(DbGeography searchPoint, int range)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            parameterList.Add(new SqlParameter("@Lat", searchPoint.Latitude));
            parameterList.Add(new SqlParameter("@Long", searchPoint.Longitude));
            parameterList.Add(new SqlParameter("@range", range));
            SqlParameter[] parameters = parameterList.ToArray();
            List<ONNET_SRCH_NE> result = db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range", parameterList.ToArray()).ToList();
            return result.Select(m => new LrdViewModel {LrdName = m.LRD, GeodataValue = m.GEODATA.AsText()}).GroupBy(m => m.LrdName).Select(m => m.First()).ToList();            
        }

        public List<NEViewModel> getNENames(DbGeography searchPoint, int range, string lrd)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            parameterList.Add(new SqlParameter("@Lat", searchPoint.Latitude));
            parameterList.Add(new SqlParameter("@Long", searchPoint.Longitude));
            parameterList.Add(new SqlParameter("@range", range));
            parameterList.Add(new SqlParameter("@LRD", lrd));
            SqlParameter[] parameters = parameterList.ToArray();
            List<NEViewModel> result = db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range and LRD=@LRD", parameterList.ToArray()).Select(g => new NEViewModel
                {
                    NetworkElementID = g.NE_ID,
                    NetworkElementName = g.NE_NAME,
                    NetworkElementType = g.NE_OT_NAME,
                    Role = g.ROLE
                }).ToList();
            return result;            
        }

        public List<ThresholdViewModel> getThresholdDetails(string NEName)
        {
            return db.ONNET_SRCH_OSP_THRESHOLD.Where(m => m.NE_NAME.ToUpper() == NEName.ToUpper()).ProjectTo<ThresholdViewModel>().ToList();
        }

        public List<CableViewModel> getCables(DbGeography searchPoint, int range)
        {
            try
            {
                return db.ONNET_SRCH_OSP_CABLE.Select(c => new CableViewModel
                {
                    CableID = c.CABLE_ID,
                    CableName = c.CABLE_NAME,
                    CableType = c.CABLE_TYPE,
                    NumberOfFibers = c.NUM_OF_FIBERS,
                    Geodata = c.GEODATA.AsText()
                }).ToList();
            }
            catch { throw new Exception("An error occured while loading cable information"); }
        }

        public List<CableViewModel> getCableDetails(string cableType)
        {
            return db.ONNET_SRCH_OSP_CABLE.Where(m => m.CABLE_TYPE.ToUpper() == cableType.ToUpper()).ProjectTo<CableViewModel>().ToList();
        }

        public List<BuildingViewModel> getBuildingDetails(DbGeography searchPoint, int range)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.ONNET_SRCH_NE_ABE.Where(m => m.NE_NAME.ToUpper() == " ").ProjectTo<BuildingViewModel>().ToList();
        }

        
    }
}