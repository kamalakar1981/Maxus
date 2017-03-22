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

namespace Maxis.Infrastructure.Repositories
{
    public class MapRepository : IMapRepository
    {
        private MaxisEntities db = new MaxisEntities();

        public MapRepository() { }
        public List<string> getLRDValues()
        {
            return db.ONNET_SRCH_NE.Select(m => m.LRD).Distinct().ToList();
        }

        public List<string> getLRDRangeValues(DbGeography searchPoint, int range)
        {
            return db.ONNET_SRCH_NE.Select(m => m.LRD).Distinct().ToList();
        }

        public List<string> getNENames(string LRD)
        {
            return db.ONNET_SRCH_NE.Where(m => m.LRD.ToUpper() == LRD.ToUpper()).Select(m => m.NE_NAME).ToList();
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