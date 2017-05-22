using System.Collections.Generic;

namespace Maxis.ViewModels
{
    public class DefaultRangeViewModel
    {
        public int Range { get; set; }
        public List<BuildingViewModel> Buildings { get; set; }
        public List<CableViewModel> Cables { get; set; }
    }
}