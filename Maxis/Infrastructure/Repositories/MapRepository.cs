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
        private readonly IMaxisEntities _db;
        public MapRepository(IMaxisEntities maxisDbContext)
        {
            _db = maxisDbContext;
        }

        /// <summary>
        /// Returns default values in the nearest range available as per the search coordinates.
        /// </summary>
        /// <param name="searchPoint">Search coordinates</param>
        /// <returns></returns>
        public DefaultRangeViewModel GetDefaultValues(DbGeography searchPoint)
        {
            int range;
            //List<BuildingViewModel> buildings = null;
            //List<CableViewModel> cables = null;
            for (range = 10; range <= 100; range = range + 10)
            {
               var buildings = GetBuildingDetails(searchPoint, range);
                if (buildings.Any()) break;
            }
            //cables = GetCables(searchPoint, range);
            return new DefaultRangeViewModel
            {
                Range = (range > 100) ? 100 : range ,
                //Buildings = buildings,
                //Cables = cables                
            };
        }

        /// <summary>
        /// Get LRD Details
        /// </summary>
        /// <param name="buildingIds">Comma seperated building Ids</param>
        /// <param name="range">range</param>
        /// <returns>LrdViewModel</returns>        
        public List<LrdViewModel> GetLrdValues(string buildingIds)
        {
            var result = _db.Database.SqlQuery<ONNET_SRCH_NE>("dbo.GETLRDBYBUILDING @BUILDINGIDS", new SqlParameter("@BUILDINGIDS", buildingIds));
            return result.Select(m => new LrdViewModel { LrdName = m.LRD, GeodataValue = m.GEODATA.AsText() })
                 .GroupBy(m => m.LrdName)
                 .Select(m => m.First())
                 .OrderBy(m => m.LrdName)
                 .ToList();
        }
        /// <summary>
        /// Get Network Element details
        /// </summary>
        /// <param name="searchPoint">Search coordinates</param>
        /// <param name="range">range</param>
        /// <param name="lrd">lrd</param>
        /// <returns>NeViewModel</returns>
        public List<NeViewModel> GetNeNames(DbGeography searchPoint, int range, string lrd)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range),
                new SqlParameter("@LRDs", lrd)

            };
            var result = _db.Database.SqlQuery<ONNET_SRCH_NE>("dbo.GETNENAMES @Lat, @Long, @range, @LRDs", parameterList.ToArray())
                .Join(_db.ONNET_SOURCE_TARGET, n => n.NE_ID, t => t.NE_ID,
                    (n, t) => new { n, t })
            .Select(g => new NeViewModel
            {
                NetworkElementId  = g.n.NE_ID,
                NetworkElementName = g.n.NE_NAME,
                NetworkElementType = g.n.NE_OT_NAME,
                Role = g.n.ROLE,
                Target = g.t.TARGET
            }).OrderBy(m => m.NetworkElementName).ToList();
            return result;
        }

        /// <summary>
        /// Get threshold information
        /// </summary>
        /// <param name="neName">Network Element Name</param>
        /// <returns>ThresholdViewModel</returns>
        public List<ThresholdViewModel> GetThresholdDetails(string neName)
        {
            return
                _db.ONNET_SRCH_OSP_THRESHOLD.Where(m => m.NE_NAME.ToUpper() == neName.ToUpper() && m.TOTAL > 0)
                    .OrderBy(m => m.TRH_TEMPL_NAME)
                    .ProjectTo<ThresholdViewModel>()
                    .ToList();
        }

        /// <summary>
        /// Get cable information 
        /// </summary>
        /// <param name="searchPoint">Search coordinates</param>
        /// <param name="range">range</param>
        /// <returns>CableViewModel</returns>
        public List<CableViewModel> GetCables(DbGeography searchPoint, int range)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range)
            };
            var result = _db.Database.SqlQuery<ONNET_SRCH_OSP_CABLE>("dbo.GETCABLES @Lat, @Long, @range", parameterList.ToArray());
            return result.Select(c => new CableViewModel
            {
                CableId = c.CABLE_ID.ToString(),
                CableName = c.CABLE_NAME,
                NumberOfFibers = c.NUM_OF_FIBERS,
                CableType = c.CABLE_TYPE,
                Geodata = c.GEODATA.AsText()
            }).OrderBy(m => m.CableName).ToList();
        }

        /// <summary>
        /// Get cable details
        /// </summary>
        /// <param name="cableType">cable type</param>
        /// <returns>CableViewModel</returns>
        public List<CableViewModel> GetCableDetails(string cableType)
        {
            return
                _db.ONNET_SRCH_OSP_CABLE.Where(m => m.CABLE_TYPE.ToUpper() == cableType.ToUpper())
                    .ProjectTo<CableViewModel>()
                    .ToList();
        }

        /// <summary>
        /// Get building details
        /// </summary>
        /// <param name="searchPoint">search coordinates</param>
        /// <param name="range">range</param>
        /// <returns>BuildingViewModel</returns>
        public List<BuildingViewModel> GetBuildingDetails(DbGeography searchPoint, int range)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range)
            };
            var result = _db.Database.SqlQuery<ONNET_SRCH_BUILDING>("dbo.GETBUILDINGDETAILS @Lat, @Long, @range", parameterList.ToArray())
                .Join(_db.ONNET_SRCH_NE_ABE, b => b.BUILDING_ID, a => a.ABE_ID,
                    (b, a) => new { b, a })
                .Join(_db.ONNET_SRCH_NE, n => n.a.NE_ID, ne => ne.NE_ID, (n, ne) => new { n, ne })
                .Select(m => new BuildingViewModel()
                {
                    BuildingId = m.n.a.ABE_ID.ToString(),
                    BuildingName = m.n.b.BUILDING,
                    Street = m.n.b.STREET,
                    City = m.n.b.CITY,
                    State = m.n.b.STATE,
                    Geodata = m.n.b.GEODATA.AsText(),
                    NetworkElementId = m.ne.NE_ID,
                    Lrd = m.ne.LRD
                });
            return result.GroupBy(m => m.BuildingId).Select(m => m.First()).OrderBy(m => m.BuildingName).ToList();
        }

        /// <summary>
        /// Get structure details
        /// </summary>
        /// <param name="searchPoint">Search coordinates</param>
        /// <param name="range">Range</param>
        /// <param name="cableId">CableId</param>
        /// <returns>StructureViewmodel</returns>
        public List<StructureViewmodel> GetStructureDetails(DbGeography searchPoint, int range, long cableId)
        {
            var parameterList = new List<SqlParameter>
            {
                new SqlParameter("@Lat", searchPoint.Latitude),
                new SqlParameter("@Long", searchPoint.Longitude),
                new SqlParameter("@range", range)
            };
            var result = _db.Database.SqlQuery<ONNET_SRCH_OSP_STRUCT>("dbo.GETSTRUCTUREDETAILS @Lat, @Long, @range", parameterList.ToArray())
                .Join(_db.ONNET_SRCH_OSP_CABLE_STRUCT, s => s.STRUCT_ID, cs => cs.STRUCT_ID,
                    (s, cs) => new { s, cs }).Select(m => new StructureViewmodel()
                    {
                        StructureId = m.s.STRUCT_ID,
                        StructureName = m.s.STRUCT_NAME,
                        StructureOtName = m.s.STRUCT_OT_NAME,
                        Geodata = m.s.GEODATA.AsText(),
                        CableId = m.cs.CABLE_ID
                    });
            return result.Where(m => m.CableId == cableId).ToList();
        }

    }
}