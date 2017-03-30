using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Maxis.Infrastructure.Repositories.Abstract;
using Maxis.Infrastructure.Repositories;
using Maxis.Database;
using Maxis.Services.Abstract;
using Maxis.ViewModels;
using System.Data.Spatial;

namespace Maxis.Services
{
    public class MapService : IMapService
    {
        private readonly IMapRepository _mapRepository;

        public MapService(IMapRepository mapRepository)
        {
            _mapRepository = mapRepository;
        }
        
        
        public List<LrdViewModel> getLRDValues(DbGeography searchPoint, int range)
        {
            return _mapRepository.getLRDValues(searchPoint, range);
        }

        public List<NEViewModel> getNENames(DbGeography searchPoint, int range, string lrd)
        {
            return _mapRepository.getNENames(searchPoint, range, lrd);
        }

        public List<ThresholdViewModel> getThresholdDetails(string NEName)
        {
            return _mapRepository.getThresholdDetails(NEName);
        }

        public List<CableViewModel> getCables(DbGeography searchPoint, int range)
        {
            return _mapRepository.getCables(searchPoint, range);
        }

        public List<CableViewModel> getCableDetails(string cableType)
        {
            return _mapRepository.getCableDetails(cableType);
        }

        public List<BuildingViewModel> getBuildingDetails(DbGeography searchPoint, int range)
        {
            return _mapRepository.getBuildingDetails(searchPoint, range);
        }
        
    }
}