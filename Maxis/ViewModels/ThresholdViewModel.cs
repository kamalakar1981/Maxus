using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class ThresholdViewModel
    {
        public string ThresholdTemplateName { get; set; }
        public decimal? Total { get; set; }
        public decimal? Available { get; set; }
        public decimal? Used { get; set; }
        public decimal? Value { get; set; }
    }
}