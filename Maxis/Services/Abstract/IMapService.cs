using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Maxis.Database;
using Maxis.ViewModels;
using System.Data.Spatial;

namespace Maxis.Services.Abstract
{
    public interface IMapService
    {
        List<LrdViewModel> getLRDValues(DbGeography searchPoint, int range);

        List<NEViewModel> getNENames(DbGeography searchPoint, int range, string lrd);

        List<ThresholdViewModel> getThresholdDetails(string NEName);

        List<CableViewModel> getCables(DbGeography searchPoint, int range);

        List<CableViewModel> getCableDetails(string cableType);

        List<BuildingViewModel> getBuildingDetails(DbGeography searchPoint, int range);

        

    }
}
