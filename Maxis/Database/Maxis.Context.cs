﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MaxisEntities : DbContext, IMaxisEntities
    {
        public MaxisEntities()
            : base("name=MAXISDEVEntities")
        {

        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<EXCEPTIONLOG> EXCEPTIONLOGs { get; set; }
        public virtual DbSet<ONNET_SRCH_BUILDING> ONNET_SRCH_BUILDING { get; set; }
        public virtual DbSet<ONNET_SRCH_DL_ID_LIST> ONNET_SRCH_DL_ID_LIST { get; set; }
        public virtual DbSet<ONNET_SRCH_NE> ONNET_SRCH_NE { get; set; }
        public virtual DbSet<ONNET_SRCH_OSP_CABLE> ONNET_SRCH_OSP_CABLE { get; set; }
        public virtual DbSet<ONNET_USER> ONNET_USER { get; set; }
        public virtual DbSet<ONNET_USERROLE> ONNET_USERROLE { get; set; }
        public virtual DbSet<ONNET_SRCH_NE_ABE> ONNET_SRCH_NE_ABE { get; set; }
        public virtual DbSet<ONNET_SRCH_OSP_CABLE_STRUCT> ONNET_SRCH_OSP_CABLE_STRUCT { get; set; }
        public virtual DbSet<ONNET_SRCH_OSP_STRUCT> ONNET_SRCH_OSP_STRUCT { get; set; }
        public virtual DbSet<ONNET_SRCH_OSP_THRESHOLD> ONNET_SRCH_OSP_THRESHOLD { get; set; }
        public virtual DbSet<EXCEPTIONLOG> EXCEPTIONLOGs { get; set; }
        public virtual DbSet<ONNET_SOURCE_TARGET> ONNET_SOURCE_TARGET { get; set; }
    }
}
