using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Maxis.ViewModels
{
    public class StructureViewmodel
    {
        public long StructureId { get; set; }
        public string StructureName { get; set; }
        public string StructureOtName { get; set; }
        public string Geodata { get; set; }
        public long CableId { get; set; }
    }
}