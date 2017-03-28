using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Spatial;

namespace Maxis.ViewModels
{
    public class PointViewModel
    {
        public string SearchPoint { get; set; }
        public int Range { get; set; }
        public string Netype { get; set; }
        public string LRD { get; set; }
    }
}