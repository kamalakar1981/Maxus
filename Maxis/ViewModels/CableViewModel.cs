using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class CableViewModel
    {
        public long CableID { get; set; }
        public string CableName { get; set; }
        //public long CableOTID { get; set; }
        //public string CableOTName { get; set; }
        public Nullable<int> NumberOfFibers { get; set; }
        public string CableType { get; set; }
        //public string Length { get; set; }
        //public string ADMstatus { get; set; }
        //public string Manufacturer { get; set; }
        //public string ColorSchema { get; set; }
        public string Geodata { get; set; }
        //public Nullable<System.DateTime> LatestCreated { get; set; }
        //public Nullable<System.DateTime> LatestUpdated { get; set; }
    }
}