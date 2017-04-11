using System;
using System.Collections.Generic;
using Maxis.Infrastructure.Repositories.Abstract;
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
        
        
        public List<LrdViewModel> GetLrdValues(DbGeography searchPoint, int range)
        {
            return _mapRepository.GetLrdValues(searchPoint, range);
        }

        public List<NeViewModel> GetNeNames(DbGeography searchPoint, int range, string lrd)
        {
            return _mapRepository.GetNeNames(searchPoint, range, lrd);
        }

        public List<ThresholdViewModel> GetThresholdDetails(string neName)
        {
            return _mapRepository.GetThresholdDetails(neName);
        }

        public List<CableViewModel> GetCables(DbGeography searchPoint, int range)
        {
            return _mapRepository.GetCables(searchPoint, range);
        }

        public List<CableViewModel> GetCableDetails(string cableType)
        {
            return _mapRepository.GetCableDetails(cableType);
        }

        public List<BuildingViewModel> GetBuildingDetails(DbGeography searchPoint, int range)
        {
            return _mapRepository.GetBuildingDetails(searchPoint, range);
        }

        public List<StructureViewmodel> GetStructureDetails(DbGeography searchPoint, int range, long cableId)
        {
            return _mapRepository.GetStructureDetails(searchPoint, range, cableId);
        }

    }
}