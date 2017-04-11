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
                config.CreateMap<ONNET_SRCH_OSP_CABLE, CableViewModel>()
                .ForMember(dest => dest.CableId, opt => opt.MapFrom(src => src.CABLE_ID))
                .ForMember(dest => dest.CableName, opt => opt.MapFrom(src => src.CABLE_NAME))
                .ForMember(dest => dest.NumberOfFibers, opt => opt.MapFrom(src => src.NUM_OF_FIBERS))
                .ForMember(dest => dest.CableType, opt => opt.MapFrom(src => src.CABLE_TYPE))
                .ForMember(dest => dest.Geodata, opt => opt.MapFrom(src => src.GEODATA));

                config.CreateMap<ONNET_SRCH_OSP_THRESHOLD, ThresholdViewModel>()
                .ForMember(dest => dest.ThresholdTemplateName, opt => opt.MapFrom(src => src.TRH_TEMPL_NAME))
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.TOTAL))
                .ForMember(dest => dest.Available, opt => opt.MapFrom(src => src.AVAIL))
                .ForMember(dest => dest.Used, opt => opt.MapFrom(src => src.USED))
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.VALUE));

                config.CreateMap<ONNET_SRCH_NE, NeViewModel>()
                .ForMember(dest => dest.NetworkElementId, opt => opt.MapFrom(src => src.NE_ID))
                .ForMember(dest => dest.NetworkElementName, opt => opt.MapFrom(src => src.NE_NAME))
                .ForMember(dest => dest.NetworkElementType, opt => opt.MapFrom(src => src.NE_OT_NAME))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.ROLE));
   
            });
        }
    }
}