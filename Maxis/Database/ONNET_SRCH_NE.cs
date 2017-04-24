//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Maxis.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class ONNET_SRCH_NE
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ONNET_SRCH_NE()
        {
            this.ONNET_SRCH_DL_ID_LIST = new HashSet<ONNET_SRCH_DL_ID_LIST>();
            this.ONNET_SRCH_NE_ABE = new HashSet<ONNET_SRCH_NE_ABE>();
        }
    
        public long NE_ID { get; set; }
        public string NE_NAME { get; set; }
        public long NE_OT_ID { get; set; }
        public string NE_OT_NAME { get; set; }
        public string ROLE { get; set; }
        public string ST_AMOUNT { get; set; }
        public string DL_ID_LST { get; set; }
        public string MANUFACTURER { get; set; }
        public string STATUS { get; set; }
        public string STATE { get; set; }
        public string LRD { get; set; }
        public string ADDRESS { get; set; }
        public string SITE_LONG_NAME { get; set; }
        public string ENGINEERING_REGION { get; set; }
        public string OPERATION_REGION { get; set; }
        public System.Data.Entity.Spatial.DbGeography GEODATA { get; set; }
        public Nullable<System.DateTime> LTST_CRTD_WHEN { get; set; }
        public Nullable<System.DateTime> LTST_UPTD_WHEN { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ONNET_SRCH_DL_ID_LIST> ONNET_SRCH_DL_ID_LIST { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ONNET_SRCH_NE_ABE> ONNET_SRCH_NE_ABE { get; set; }
        public virtual ONNET_SOURCE_TARGET ONNET_SOURCE_TARGET { get; set; }
    }
}
