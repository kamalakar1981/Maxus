using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class ThresholdViewModel
    {
        public string ThresholdTemplateName { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<decimal> Available { get; set; }
        public Nullable<decimal> Used { get; set; }
        public Nullable<decimal> Value { get; set; }
        public Nullable<decimal> OldValue { get; set; }
    }
}