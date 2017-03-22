using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using Maxis.Database;
using Maxis.ViewModels;
using System.Data.Spatial;

namespace Maxis.Infrastructure.Repositories.Abstract
{
    public interface IMapRepository
    {
        List<string> getLRDValues();

        List<string> getLRDRangeValues(DbGeography searchPoint, int range);

        List<string> getNENames(string LRD);

        List<string> getCableTypes();

        List<CableViewModel> getCableDetails(string cableType);

        List<BuildingViewModel> getBuildingDetails(string NEName);

        List<ThresholdViewModel> getThresholdDetails(string NEName);




    }
}
