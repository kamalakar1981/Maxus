using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class BuildingViewModel
    {
        public long AddressBookelementID { get; set; }
        public string AddressBookElementName { get; set; }
        public long AddressBookElementOTID { get; set; }
        public string AddressBookElementOTNAME { get; set; }
        public string NetworkElementName { get; set; }
        public long NetworkElementID { get; set; }
        public long NetworkElementOTID { get; set; }
        public string NetworkElementOTName { get; set; }
    }
}