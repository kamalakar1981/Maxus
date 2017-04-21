using System;
using System.Data.Entity;

namespace Maxis.Database
{
    public interface IMaxisEntities : IDbContext
    {
        DbSet<ONNET_SRCH_BUILDING> ONNET_SRCH_BUILDING { get; set; }
        DbSet<ONNET_SRCH_DL_ID_LIST> ONNET_SRCH_DL_ID_LIST { get; set; }
        DbSet<ONNET_SRCH_NE> ONNET_SRCH_NE { get; set; }
        DbSet<ONNET_SRCH_NE_ABE> ONNET_SRCH_NE_ABE { get; set; }
        DbSet<ONNET_SRCH_OSP_CABLE> ONNET_SRCH_OSP_CABLE { get; set; }
        DbSet<ONNET_USER> ONNET_USER { get; set; }
        DbSet<ONNET_USERROLE> ONNET_USERROLE { get; set; }
        DbSet<ONNET_SRCH_OSP_CABLE_STRUCT> ONNET_SRCH_OSP_CABLE_STRUCT { get; set; }
        DbSet<ONNET_SRCH_OSP_STRUCT> ONNET_SRCH_OSP_STRUCT { get; set; }
        DbSet<ONNET_SRCH_OSP_THRESHOLD> ONNET_SRCH_OSP_THRESHOLD { get; set; }
        DbSet<EXCEPTIONLOG> EXCEPTIONLOGs { get; set; }
        DbSet<ONNET_SOURCE_TARGET> ONNET_SOURCE_TARGET { get; set; }
    }
}
