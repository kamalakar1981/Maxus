using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Maxis.Database;
using Maxis.ViewModels;
using AutoMapper;

namespace Maxis.App_Start
{
    public static class MappingConfig
    {
        public static void RegisterMaps()
        {
            AutoMapper.Mapper.Initialize(config =>
            {
                //config.CreateMap<ONNET_SRCH_NE_ABE, BuildingViewModel>()
                //.ForMember(dest => dest.AddressBookelementID, opt => opt.MapFrom(src => src.ABE_ID))
                //.ForMember(dest => dest.AddressBookElementName, opt => opt.MapFrom(src => src.ABE_NAME))
                //.ForMember(dest => dest.AddressBookElementOTID, opt => opt.MapFrom(src => src.ABE_OT_ID))
                //.ForMember(dest => dest.AddressBookElementOTNAME, opt => opt.MapFrom(src => src.ABE_OT_NAME))
                //.ForMember(dest => dest.NetworkElementName, opt => opt.MapFrom(src => src.NE_NAME))
                //.ForMember(dest => dest.NetworkElementID, opt => opt.MapFrom(src => src.NE_ID))
                //.ForMember(dest => dest.NetworkElementOTID, opt => opt.MapFrom(src => src.NE_OT_ID))
                //.ForMember(dest => dest.NetworkElementOTName, opt => opt.MapFrom(src => src.NE_OT_NAME));

                config.CreateMap<ONNET_SRCH_OSP_CABLE, CableViewModel>()
                .ForMember(dest => dest.CableId, opt => opt.MapFrom(src => src.CABLE_ID))
                .ForMember(dest => dest.CableName, opt => opt.MapFrom(src => src.CABLE_NAME))
                //.ForMember(dest => dest.CableOTID, opt => opt.MapFrom(src => src.CABLE_OT_ID))
                //.ForMember(dest => dest.CableOTName, opt => opt.MapFrom(src => src.CABLE_OT_NAME))
                .ForMember(dest => dest.NumberOfFibers, opt => opt.MapFrom(src => src.NUM_OF_FIBERS))
                .ForMember(dest => dest.CableType, opt => opt.MapFrom(src => src.CABLE_TYPE))
                //.ForMember(dest => dest.Length, opt => opt.MapFrom(src => src.LENGTH))
                //.ForMember(dest => dest.ADMstatus, opt => opt.MapFrom(src => src.ADM_STATUS))
                //.ForMember(dest => dest.Manufacturer, opt => opt.MapFrom(src => src.MANUFACTURER))
                //.ForMember(dest => dest.ColorSchema, opt => opt.MapFrom(src => src.COLOR_SCHEMA))
                .ForMember(dest => dest.Geodata, opt => opt.MapFrom(src => src.GEODATA));
                //.ForMember(dest => dest.LatestCreated, opt => opt.MapFrom(src => src.LTST_CRTD_WHEN))
                //.ForMember(dest => dest.LatestUpdated, opt => opt.MapFrom(src => src.LTST_UPTD_WHEN));

                config.CreateMap<ONNET_SRCH_OSP_THRESHOLD, ThresholdViewModel>()
                //.ForMember(dest => dest.NetworkElementID, opt => opt.MapFrom(src => src.NE_ID))
                //.ForMember(dest => dest.NetworkElementName, opt => opt.MapFrom(src => src.NE_NAME))
                //.ForMember(dest => dest.NetworkElementOTID, opt => opt.MapFrom(src => src.NE_OT_ID))
                //.ForMember(dest => dest.NetworkElementOTNAME, opt => opt.MapFrom(src => src.NE_OT_NAME))
                //.ForMember(dest => dest.DevID, opt => opt.MapFrom(src => src.DEV_ID))
                //.ForMember(dest => dest.DevName, opt => opt.MapFrom(src => src.DEV_NAME))
                //.ForMember(dest => dest.DevOTID, opt => opt.MapFrom(src => src.DEV_OT_ID))
                //.ForMember(dest => dest.ThresholdTemplateID, opt => opt.MapFrom(src => src.THR_TEMPL_ID))
                .ForMember(dest => dest.ThresholdTemplateName, opt => opt.MapFrom(src => src.TRH_TEMPL_NAME))
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.TOTAL))
                .ForMember(dest => dest.Available, opt => opt.MapFrom(src => src.AVAIL))
                .ForMember(dest => dest.Used, opt => opt.MapFrom(src => src.USED))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.VALUE))
                .ForMember(dest => dest.OldValue, opt => opt.MapFrom(src => src.OLD_VALUE));
                //.ForMember(dest => dest.PlannedToUse, opt => opt.MapFrom(src => src.PLANNED_TO_USE))
                //.ForMember(dest => dest.IsDev, opt => opt.MapFrom(src => src.IS_DEV));

                config.CreateMap<ONNET_SRCH_NE, NeViewModel>()
                .ForMember(dest => dest.NetworkElementId, opt => opt.MapFrom(src => src.NE_ID))
                .ForMember(dest => dest.NetworkElementName, opt => opt.MapFrom(src => src.NE_NAME))
                .ForMember(dest => dest.NetworkElementType, opt => opt.MapFrom(src => src.NE_OT_NAME))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.ROLE));
   
            });
        }
    }
}