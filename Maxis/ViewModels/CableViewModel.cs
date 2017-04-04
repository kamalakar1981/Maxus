using System;

namespace Maxis.ViewModels
{
    public class CableViewModel
    {
        public long CableId { get; set; }
        public string CableName { get; set; }
        public int? NumberOfFibers { get; set; }
        public string CableType { get; set; }
        public string Geodata { get; set; }
    }
}