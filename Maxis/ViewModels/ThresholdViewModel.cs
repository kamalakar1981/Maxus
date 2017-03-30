using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class ThresholdViewModel
    {
        //public long NetworkElementID { get; set; }
        //public string NetworkElementName { get; set; }
        //public Nullable<long> NetworkElementOTID { get; set; }
        //public string NetworkElementOTNAME { get; set; }
        //public long DevID { get; set; }
        //public string DevName { get; set; }
        //public Nullable<long> DevOTID { get; set; }
        //public long ThresholdTemplateID { get; set; }
        public string ThresholdTemplateName { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<decimal> Available { get; set; }
        public Nullable<decimal> Used { get; set; }
        public Nullable<decimal> Value { get; set; }
        public Nullable<decimal> OldValue { get; set; }
        //public Nullable<decimal> PlannedToUse { get; set; }
        //public Nullable<decimal> IsDev { get; set; }
    }
}