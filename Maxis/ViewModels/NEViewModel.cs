using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class NEViewModel
    {
        public Int64 NetworkElementID { get; set; }
        public string NetworkElementName { get; set; }
        public string NetworkElementType { get; set; }
        public string Role { get; set; }        
    }
}