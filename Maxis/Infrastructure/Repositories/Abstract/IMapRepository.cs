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

        List<string> getNETypes(DbGeography searchPoint, int range);

        List<string> getLRDValues(DbGeography searchPoint, int range);

        List<string> getLRDRangeValues(DbGeography searchPoint, int range);        

        List<string> getCableTypes();

        List<CableViewModel> getCableDetails(string cableType);

        List<BuildingViewModel> getBuildingDetails(string NEName);

        List<ThresholdViewModel> getThresholdDetails(string NEName);




    }
}
