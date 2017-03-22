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

        public List<string> getLRDValues()
        {
            return _mapRepository.getLRDValues();
        }

        public List<string> getLRDRangeValues(DbGeography searchPoint, int range)
        {
            return _mapRepository.getLRDRangeValues(searchPoint, range);
        }

        public List<string> getNENames(string LRD)
        {
            return _mapRepository.getNENames(LRD);
        }

        public List<string> getCableTypes()
        {
            return _mapRepository.getCableTypes();
        }

        public List<CableViewModel> getCableDetails(string cableType)
        {
            return _mapRepository.getCableDetails(cableType);
        }

        public List<BuildingViewModel> getBuildingDetails(string NEName)
        {
            return _mapRepository.getBuildingDetails(NEName);
        }

        public List<ThresholdViewModel> getThresholdDetails(string NEName)
        {
            return _mapRepository.getThresholdDetails(NEName);
        }
    }
}