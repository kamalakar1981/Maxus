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



        public List<string> getNETypes(DbGeography searchPoint, int range)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            parameterList.Add(new SqlParameter("@Lat", searchPoint.Latitude));
            parameterList.Add(new SqlParameter("@Long", searchPoint.Longitude));
            parameterList.Add(new SqlParameter("@range", range));
            SqlParameter[] parameters = parameterList.ToArray();
            List<ONNET_SRCH_NE> result = db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range", parameterList.ToArray()).ToList();
            //return (from r in result select r.ToString()).ToList();
            return result.Select(m => m.NE_OT_NAME).Distinct().ToList();
            //return db.ONNET_SRCH_NE.Where(m => m.LRD.ToUpper() == LRD.ToUpper()).Select(m => m.NE_NAME).ToList();
        }
        public List<string> getLRDValues(DbGeography searchPoint, int range)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            parameterList.Add(new SqlParameter("@Lat", searchPoint.Latitude));
            parameterList.Add(new SqlParameter("@Long", searchPoint.Longitude));
            parameterList.Add(new SqlParameter("@range", range));
            SqlParameter[] parameters = parameterList.ToArray();
            List<ONNET_SRCH_NE> result = db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range", parameterList.ToArray()).ToList();
            return result.Select(m => m.LRD).Distinct().ToList();
            //return db.ONNET_SRCH_NE.Select(m => m.LRD).Distinct().ToList();
        }

        public List<string> getLRDRangeValues(DbGeography searchPoint, int range)
        {
            List<SqlParameter> parameterList = new List<SqlParameter>();
            parameterList.Add(new SqlParameter("@Lat", searchPoint.Latitude));
            parameterList.Add(new SqlParameter("@Long", searchPoint.Longitude));
            parameterList.Add(new SqlParameter("@range", range));
            SqlParameter[] parameters = parameterList.ToArray();
            List<ONNET_SRCH_NE> result =  db.ONNET_SRCH_NE.SqlQuery("SELECT * FROM(SELECT *,(((acos(sin((@Lat*pi()/180)) * sin((GEODATA.Lat*pi()/180))+cos((@Lat*pi()/180)) " +
                "* cos((GEODATA.Lat*pi()/180)) * cos(((@Long - GEODATA.Long)*pi()/180))))*180/pi())*60*1.1515*1.609344) " +
                "as distance FROM ONNET_SRCH_NE) t WHERE distance <= @range", parameterList.ToArray()).ToList();
            return new List<string>();
        }        

        public List<string> getCableTypes()
        {
            return db.ONNET_SRCH_OSP_CABLE.Select(m => m.CABLE_TYPE).Distinct().ToList();
        }

        public List<CableViewModel> getCableDetails(string cableType)
        {
            return db.ONNET_SRCH_OSP_CABLE.Where(m => m.CABLE_TYPE.ToUpper() == cableType.ToUpper()).ProjectTo<CableViewModel>().ToList();
        }

        public List<BuildingViewModel> getBuildingDetails(string NEName)
        {
            db.Configuration.ProxyCreationEnabled = false;
            return db.ONNET_SRCH_NE_ABE.Where(m => m.NE_NAME.ToUpper() == NEName.ToUpper()).ProjectTo<BuildingViewModel>().ToList();
        }

        public List<ThresholdViewModel> getThresholdDetails(string NEName)
        {
            return db.ONNET_SRCH_OSP_THRESHOLD.Where(m => m.NE_NAME.ToUpper() == NEName.ToUpper()).ProjectTo<ThresholdViewModel>().ToList();
        }
    }
}