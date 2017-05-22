using System.Collections.Generic;
using Maxis.ViewModels;
using System.Data.Spatial;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IMapRepository
    {
        DefaultRangeViewModel GetDefaultValues(DbGeography searchPoint);

        List<LrdViewModel> GetLrdValues(string buildingIds);

        List<NeViewModel> GetNeNames(DbGeography searchPoint, int range, string lrd);

        List<ThresholdViewModel> GetThresholdDetails(string neName);

        List<CableViewModel> GetCables(DbGeography searchPoint, int range);

        List<CableViewModel> GetCableDetails(string cableType);

        List<BuildingViewModel> GetBuildingDetails(DbGeography searchPoint, int range);

        List<StructureViewmodel> GetStructureDetails(DbGeography searchPoint, int range, long cableId);

    }
}
