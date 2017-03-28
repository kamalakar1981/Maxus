
﻿//import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
//import { MapsAPILoader } from 'angular2-google-maps/core';
//import { FormControl, FormGroup } from "@angular/forms";


import { Component, NgModule, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FormControl, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';
import { Map } from './shared/map.interface';
import { MapService } from './shared/map.service';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule } from 'primeng/primeng';
///import { SelectModule } from 'ng2-select';

import { SelectModule } from 'angular2-select';
// { SelectModule } from "angular2-select";
//import { FormControl, FormsModule, FormGroup ,ReactiveFormsModule } from '@angular/forms';
declare var google: any;
@Component({
    selector: 'map',

    templateUrl: 'wwwroot/map/map.component.html',
    styleUrls: ['wwwroot/map/map.component.css']
})

export class MapComponent implements OnInit {
    errorMessage: string;
    //public maps: Map[];

    selectedMap: Map;

    
    onSelect(map: Map) {
        this.selectedMap = map;
    }
    markerTypes: any[];
    cabelTypes : any[];
    

    //console.log(markertypes);
    getMarker() {
        

    }
    getCabelTypes() {

    }
    imgSize: number = 24;
    name: string = "Accionlabs";
    zoom: number = 18;
    //  initial center position for the map



    lat: number = 3.15104206724095;
    lng: number = 101.663805603203;
    markerNumber: string = "";

    markers: ICable[] = this.getCables();
    points: IMarker[] = this.getPoints();
    buildings: IMarker[];

    //markerTypes = this.getMarkerTypes();
    //getMarkerTypes(): any[] {
    //    return [
    //        {
    //            value: "Ethernet Switch",
    //            label: "Ethernet Switch"
    //        },
    //        {
    //            value: "Anymedia",
    //            label: "Anymedia"
    //        }
    //    ];
    //}
   distance = this.getDistance();
    getDistance() :any[]{
        return [
            {
                value: "20",
                label:"within 20 km"
            },
            {
                value: "50",
                label: "within 50 km"
            },
            {
                value: "100",
                label: "within 100 km"
            },
             {
                 value: "150",
                label: "within 150 km"

             },
             {
                 value: "200",
                 label:"within 200 km"

             }
        ];
    };

    markerNames = this.getMarkerNames([]);
    //cabelTypes = this.getCabelTypes();
    cabelNames = this.getCabelNames([]);


    clickedMarker(label: string, index: number): void {
        console.log(`clicked the marker: ${label || index}`);
        var marker: IMarker = this.points.filter(function (value: IMarker, index: number, array: IMarker[]) {
            return value.label === label;
        })[0];
        console.log(marker);
        this.buildings = this.getBuildings(marker);
        console.log(this.buildings);
    }

    //mapClicked($event: MouseEvent) {
    //    this.markers.push({
    //        lat : $event.coords.lat,
    //        lng: $event.coords.lng
    //    });
    //}

    //    markerDragEnd(m: IMarker, $event: MouseEvent): void {
    //        console.log("dragEnd", m, $event);
    //    }

    getCables(): ICable[] {
        return [
            {
                label: "DSH10033048D01F",
                type: "Ground",
                color: "#FF0000",
                points: [
                    { lng: 101.661624891656, lat: 3.15132481835553, label: "0" },
                    { lng: 101.661662601572, lat: 3.15139295675658, label: "1" },
                    { lng: 101.66158663452, lat: 3.1516968851479, label: "2" },
                    { lng: 101.661678813831, lat: 3.15173617912158, label: "3" },
                    { lng: 101.66158663452, lat: 3.1516968851479, label: "4" },
                    { lng: 101.661498775045, lat: 3.15203941342749, label: "5" },
                    { lng: 101.661377434071, lat: 3.15241818650256, label: "6" },
                    { lng: 101.661162732456, lat: 3.1528622852578, label: "7" },
                    { lng: 101.660932361839, lat: 3.15327448416946, label: "8" },
                    { lng: 101.660635098485, lat: 3.15378689428319, label: "9" },
                    { lng: 101.660701887957, lat: 3.1538642665171, label: "10" },
                    { lng: 101.660635098485, lat: 3.15378689428319, label: "11" },
                    { lng: 101.660387942413, lat: 3.15419973920578, label: "12" },
                    { lng: 101.660178904651, lat: 3.15451365232348, label: "13" },
                    { lng: 101.659935032836, lat: 3.15480354918789, label: "14" },
                    { lng: 101.660021924976, lat: 3.15486535321321, label: "15" },
                    { lng: 101.659935032836, lat: 3.15480354918789, label: "16" },
                    { lng: 101.659758105792, lat: 3.15501372475782, label: "17" },
                    { lng: 101.659495011708, lat: 3.15523877910271, label: "18" },
                    { lng: 101.659553646016, lat: 3.15533450148464, label: "19" }
                ]
            },
            {
                label: "PKUS0031144T07F",
                type: "Ground",
                color: "#FF0000",
                points: [
                    { lng: 100.312398842349, lat: 5.43499947931377, label: "0" },
                    { lng: 100.313164120186, lat: 5.43459217923592, label: "1" },
                    { lng: 100.313621439352, lat: 5.43549662009443, label: "2" },
                    { lng: 100.312488981233, lat: 5.43657112089993, label: "3" },
                    { lng: 100.311558603082, lat: 5.43750755478676, label: "4" },
                    { lng: 100.311138207669, lat: 5.4369652065531, label: "5" },
                    { lng: 100.310957838768, lat: 5.43711771192328, label: "6" },
                    { lng: 100.310770241846, lat: 5.43727023296558, label: "7" }
                ]
            },
            {
                label: "BKMR0011096T01F",
                type: "Aerial",
                color: "#00FF00",
                points: [
                    { lng: 100.629028, lat: 4.950213, label: "0" },
                    { lng: 100.62957136228, lat: 4.95071523379341, label: "1" },
                    { lng: 100.630197687514, lat: 4.95119598491416, label: "2" },
                    { lng: 100.630792073044, lat: 4.9517250432082, label: "3" },
                    { lng: 100.631386301842, lat: 4.95218979525765, label: "4" },
                    { lng: 100.631964580891, lat: 4.95268673872097, label: "5" },
                    { lng: 100.632510762567, lat: 4.95316768416949, label: "6" },
                    { lng: 100.63308900376, lat: 4.95364854974343, label: "7" },
                    { lng: 100.633651216351, lat: 4.95412945412419, label: "8" },
                    { lng: 100.634197400317, lat: 4.95461039736399, label: "9" },
                    { lng: 100.634711644775, lat: 4.95513964810104, label: "10" },
                    { lng: 100.634744296314, lat: 4.95538071362638, label: "11" },
                    { lng: 100.634809085774, lat: 4.95565385250679, label: "12" },
                    { lng: 100.635050080366, lat: 4.95587832635359, label: "13" },
                    { lng: 100.635804807544, lat: 4.95642305722245, label: "14" },
                    { lng: 100.635918041947, lat: 4.95684076358062, label: "15" },
                    { lng: 100.635646490769, lat: 4.95722726941219, label: "16" },
                    { lng: 100.635727429126, lat: 4.95754859726455, label: "17" },
                    { lng: 100.636417645329, lat: 4.95793272226047, label: "18" },
                    { lng: 100.636883330925, lat: 4.95826917330729, label: "19" },
                    { lng: 100.637268631991, lat: 4.95850936468418, label: "20" },
                    { lng: 100.637621121731, lat: 4.95844418561165, label: "21" },
                    { lng: 100.637797128869, lat: 4.95831513825627, label: "22" },
                    { lng: 100.638181479159, lat: 4.95816949802762, label: "23" },
                    { lng: 100.638758658139, lat: 4.95821629607497, label: "24" },
                    { lng: 100.638951328605, lat: 4.95834442929094, label: "25" },
                    { lng: 100.639624644573, lat: 4.95837491167911, label: "26" },
                    { lng: 100.639864808543, lat: 4.95826178108746, label: "27" },
                    { lng: 100.640249356316, lat: 4.95819652118145, label: "28" },
                    { lng: 100.640538243202, lat: 4.95834049137044, label: "29" },
                    { lng: 100.641002858584, lat: 4.95824287951544, label: "30" },
                    { lng: 100.641483900171, lat: 4.95830599019238, label: "31" },
                    { lng: 100.641918283248, lat: 4.95894796531786, label: "32" },
                    { lng: 100.642302870526, lat: 4.95889878040868, label: "33" },
                    { lng: 100.642510577713, lat: 4.95862496608365, label: "34" },
                    { lng: 100.643086961291, lat: 4.95835023511466, label: "35" },
                    { lng: 100.64334347164, lat: 4.95836567358349, label: "36" },
                    { lng: 100.643616130644, lat: 4.95842930081501, label: "37" },
                    { lng: 100.644114553585, lat: 4.9590389617894, label: "38" },
                    { lng: 100.644339164369, lat: 4.95911878450966, label: "39" },
                    { lng: 100.644419828634, lat: 4.95932757613665, label: "40" },
                    { lng: 100.644933446736, lat: 4.95959959518111, label: "41" },
                    { lng: 100.645110248066, lat: 4.95979207091191, label: "42" },
                    { lng: 100.645400927724, lat: 4.96065946875374, label: "43" },
                    { lng: 100.645771437162, lat: 4.96139805664019, label: "44" },
                    { lng: 100.646157658337, lat: 4.96200799427898, label: "45" },
                    { lng: 100.646544079635, lat: 4.96269831254454, label: "46" },
                    { lng: 100.646882134268, lat: 4.96327621675814, label: "47" },
                    { lng: 100.647188050803, lat: 4.96382204816902, label: "48" },
                    { lng: 100.647510196954, lat: 4.96444822030464, label: "49" },
                    { lng: 100.647816114769, lat: 4.96499405105399, label: "50" },
                    { lng: 100.64810620325, lat: 4.96562030255227, label: "51" },
                    { lng: 100.648396372301, lat: 4.96627870613556, label: "52" },
                    { lng: 100.648686382317, lat: 4.96687280458496, label: "53" },
                    { lng: 100.648816296892, lat: 4.96754768444246, label: "54" },
                    { lng: 100.648738186714, lat: 4.96836777096967, label: "55" },
                    { lng: 100.648852592103, lat: 4.96925168133124, label: "56" },
                    { lng: 100.649203669916, lat: 4.96992713804362, label: "57" },
                    { lng: 100.649416948122, lat: 4.97058460212178, label: "58" },
                    { lng: 100.649417468055, lat: 4.97079359262675, label: "59" },
                    { lng: 100.649402958307, lat: 4.9714045280576, label: "60" },
                    { lng: 100.649260571195, lat: 4.97216047018042, label: "61" },
                    { lng: 100.649069534834, lat: 4.97269146600409, label: "62" },
                    { lng: 100.649022885835, lat: 4.97327032937043, label: "63" },
                    { lng: 100.649200493211, lat: 4.9737843261823, label: "64" },
                    { lng: 100.649827094002, lat: 4.97436150355231, label: "65" },
                    { lng: 100.650197259814, lat: 4.97495539881266, label: "66" },
                    { lng: 100.650503147081, lat: 4.97548514961665, label: "67" },
                    { lng: 100.65080899486, lat: 4.97599882392871, label: "68" },
                    { lng: 100.651034734341, lat: 4.97652877510038, label: "69" },
                    { lng: 100.651244364318, lat: 4.97702661392358, label: "70" },
                    { lng: 100.651470104721, lat: 4.97755656469748, label: "71" },
                    { lng: 100.65164747538, lat: 4.97797410274474, label: "72" },
                    { lng: 100.651808535703, lat: 4.97827914770944, label: "73" },
                    { lng: 100.65198622787, lat: 4.97882529486401, label: "74" },
                    { lng: 100.65209964055, lat: 4.97930729818532, label: "75" },
                    { lng: 100.652164121123, lat: 4.97945182269474, label: "76" },
                    { lng: 100.652167251847, lat: 4.98070576362309, label: "77" },
                    { lng: 100.652023384317, lat: 4.9808668875996, label: "78" },
                    { lng: 100.651832229815, lat: 4.98134965568629, label: "79" },
                    { lng: 100.651545176619, lat: 4.98194519851454, label: "80" },
                    { lng: 100.651305891748, lat: 4.98241201125116, label: "81" },
                    { lng: 100.651130204642, lat: 4.9826696727594, label: "82" },
                    { lng: 100.650970426966, lat: 4.98287906549488, label: "83" },
                    { lng: 100.650940092807, lat: 4.98357042147858, label: "84" },
                    { lng: 100.6509094377, lat: 4.9841331680763, label: "85" },
                    { lng: 100.650878581982, lat: 4.98461553381074, label: "86" },
                    { lng: 100.650847927068, lat: 4.985178280422, label: "87" },
                    { lng: 100.650801282395, lat: 4.98575714348005, label: "88" },
                    { lng: 100.650738567626, lat: 4.98631997064712, label: "89" },
                    { lng: 100.650691682166, lat: 4.98680237669006, label: "90" },
                    { lng: 100.650676856856, lat: 4.987284702196, label: "91" },
                    { lng: 100.650646001577, lat: 4.98776706798055, label: "92" },
                    { lng: 100.650631256778, lat: 4.98828154583869, label: "93" },
                    { lng: 100.650600321319, lat: 4.98873175928509, label: "94" },
                    { lng: 100.650617275349, lat: 4.9891014710031, label: "95" },
                    { lng: 100.6505862195, lat: 4.989503455932, label: "96" },
                    { lng: 100.650555404763, lat: 4.99000189791155, label: "97" },
                    { lng: 100.650797021936, lat: 4.99046750244226, label: "98" },
                    { lng: 100.651568679517, lat: 4.99134975650485, label: "99" },
                    { lng: 100.652324510294, lat: 4.99231243010065, label: "100" },
                    { lng: 100.652551548789, lat: 4.99335681524503, label: "101" },
                    { lng: 100.652906950993, lat: 4.99444910541527, label: "102" },
                    { lng: 100.653582475948, lat: 4.99534767303139, label: "103" },
                    { lng: 100.654561972573, lat: 4.99600432890766, label: "104" },
                    { lng: 100.654512067443, lat: 4.99528102397111, label: "105" },
                    { lng: 100.655, lat: 4.995, label: "106" }
                ]
            }
        ];
    };


    getBuildings(marker: IMarker): IMarker[] {
        console.log(marker);
        var arr = [
            "MENARA KURNIA, SELANGOR, PETALING JAYA, JALAN PJS 8/9",
            "MENARA LUXOR, SELANGOR, PETALING JAYA, 6B PERSIARAN TROPICANA",
            "MENARA MILLENIUM, WILAYAH PERSEKUTUAN, KUALA LUMPUR, KUALA LUMPUR, JALAN DAMANLELA",
            "MENARA MILLENIUM ANNEXE, WILAYAH PERSEKUTUAN, KUALA LUMPUR, KUALA LUMPUR, JALAN DAMANLELA"
        ];

        var imgSize = this.imgSize;

        var a: IMarker[] = arr.map(function (value: string, index: number, array: string[]) {
            return {
                label: value,
                type: "Building",
                lng: marker.lng + Math.random() * 0.001 * (Math.round(Math.random() * 1) ? -1 : 1),
                lat: marker.lat + Math.random() * 0.001 * (Math.round(Math.random() * 1) ? -1 : 1),
                icon: marker.icon.replace("satellite-dish", "flats").replace("placeholder", "flats")
            }
        });

        console.log(a);

        return a;
    }

    getPoints(): IMarker[] {
        return [
            {
                label: "BCUPEAMCP001",
                type: "Ethernet Switch",
                lng: 113.104444444444,
                lat: 1.61972222222222,
                icon: "../../Content/Images/satellite-dish-" + this.imgSize + "-blue.png"
            },
            {
                label: "WLANYWSEM002",
                type: "Anymedia",
                lng: 101.663805603203,
                lat: 3.15104206724095,
                icon: "../../Content/Images/satellite-dish-" + this.imgSize + "-red.png"
            },
            {
                label: "BLANYBAZE001",
                type: "Anymedia",
                lng: 101.594397799691,
                lat: 3.11704281553864,
                icon: "../../Content/Images/satellite-dish-" + this.imgSize + "-red.png"
            },
            {
                label: "BLANYBALI001",
                type: "Anymedia",
                lng: 100.252079072211,
                lat: 5.3505828871373,
                icon: "../../Content/Images/satellite-dish-" + this.imgSize + "-red.png"
            }
        ];
    }


    getMarkerNames(types: string[]): any[] {
        return [
            {
                value: "BLANYBALI001",
                label: "BLANYBALI001",
                type: "Anymedia"
            },
            {
                value: "BLANYBAZE001",
                label: "BLANYBAZE001",
                type: "Anymedia"
            },
            {
                value: "WLANYWSEM002",
                label: "WLANYWSEM002",
                type: "Anymedia"
            },
            {
                value: "BCUPEAMCP001",
                label: "BCUPEAMCP001",
                type: "Ethernet Switch"
            }
        ].filter(a => types.indexOf(a.type) != -1);
    }

    //getCabelTypes(): any[] {
    //    return [
    //        {
    //            value: "Ground",
    //            label: "Ground"
    //        },
    //        {
    //            value: "Aerial",
    //            label: "Aerial"
    //        }
    //    ];
    //}

    getCabelNames(types: string[]): any[] {
        return [
            {
                value: "DSH10033048D01F",
                label: "DSH10033048D01F",
                type: "Ground"
            },
            {
                value: "PKUS0031144T07F",
                label: "PKUS0031144T07F",
                type: "Ground"

            },
            {
                value: "BKMR0011096T01F",
                label: "BKMR0011096T01F",
                type: "Aerial"
            }
        ].filter(a => types.indexOf(a.type) != -1);
    }

   


    form: FormGroup;

    multiple0: boolean = false;
    multiple1: boolean = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
    selection: Array<string>;

    @ViewChild("preSingle") preSingle: ElementRef;
    @ViewChild("preMultiple") preMultiple: ElementRef;

    logSingleString: string = "";
    logMultipleString: string = "";


    onSingleOpened() {
        this.logSingle("- opened");
    }

    onSingleClosed() {
        this.logSingle("- closed");
    }

    onSingleSelected(item: any) {
        this.logSingle("- selected (value: " + item.value + ", label:" + item.label + ")");
        var p: IMarker = this.points.filter(p => p.label === this.form.value["selectSingle"])[0];
        this.lat = p.lat;
        this.lng = p.lng;
        this.zoom = 18;
        //this.closeNav();
    }

    onSingleDeselected(item: any) {
        this.logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }

    onMultipleOpened() {
        this.logMultiple("- opened");
    }

    onMultipleClosed() {
        this.logMultiple("- closed");
    }

    onMultipleSelected(item: any) {
        this.logMultiple("- selected (value: " + item.value + ", label:" + item.label + ")");
        this.markerNames = this.getMarkerNames(this.form.value["selectMultiple"]);
    }

    onMultipleDeselected(item: any) {
        this.logMultiple("- deselected (value: " + item.value + ", label:" + item.label + ")");
        this.markerNames = this.getMarkerNames(this.form.value["selectMultiple"]);
    }





    onSingleOpened1() {
        this.logSingle("- opened");
    }

    onSingleClosed1() {
        this.logSingle("- closed");
    }

    onSingleSelected1(item: any) {
        this.logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
    }
   
    onSingleSelected2(item: any) {
        this.logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
    }
    onSingleDeselected2(item: any) {
        this.logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }


    //    var p: ICable = this.markers.filter(p => p.label === this.form.value["selectSingle1"])[0];
    //     this.lat = p.points
    //         .reduce<number>((sum, a, i, ar) =>
    //         {
    //             sum += a.lat;
    //             return i == ar.length - 1 ? (ar.length == 0 ? 0 : sum / ar.length) : sum;
    //         }, 0);  

    //     this.lng = p.points
    //         .reduce<number>((sum, a, i, ar) => {
    //             sum += a.lng;
    //             return i == ar.length - 1 ? (ar.length == 0 ? 0 : sum / ar.length) : sum;
    //         }, 0);  
    //    this.lat = p.points[Math.round(p.points.length / 2)].lat;
    //    this.lng = p.points[Math.round(p.points.length / 2)].lng;
    //    this.zoom = 18;
    //}

    onSingleDeselected1(item: any) {
        this.logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }

    onMultipleOpened1() {
        this.logMultiple("- opened");
    }

    onMultipleClosed1() {
        this.logMultiple("- closed");
    }

    onMultipleSelected1(item: any) {
        this.logMultiple("- selected (value: " + item.value + ", label:" + item.label + ")");
        this.cabelNames = this.getCabelNames(this.form.value["selectMultiple1"]);
        //this.closeNav();
    }

    onMultipleDeselected1(item: any) {
        this.logMultiple("- deselected (value: " + item.value + ", label:" + item.label + ")");
       this.cabelNames = this.getCabelNames(this.form.value["selectMultiple1"]);
    }


    private logSingle(msg: string) {
        this.logSingleString += msg + "\n";

        //  Let change detection do its work before scrolling to div bottom.
        // setTimeout(() => {
        //     this.scrollToBottom(this.preSingle.nativeElement);
        // });
    }

    private logMultiple(msg: string) {
        this.logMultipleString += msg + "\n";

        //  Let change detection do its work before scrolling to div bottom.
        // setTimeout(() => {
        //    //  this.scrollToBottom(this.preMultiple.nativeElement);
        // });
    }

    private scrollToBottom(elem: any) {
        elem.scrollTop = elem.scrollHeight;
    }




    public latitude: number;
    public longitude: number;
    // public searchControl: FormControl;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private router: Router, private mapService: MapService
        //console.log(this.markerTypes),
    ) { }

    selectMultiple1: any;
    selectSingle1: any;
    foo: any[];

        ngOnInit() {

            this.form = new FormGroup({});
            this.form.addControl("selectSingle", new FormControl(""));
            this.form.addControl("selectMultiple", new FormControl(""));
            this.form.addControl("selectSingle1", new FormControl(""));
            this.form.addControl("selectMultiple1", new FormControl(""));
            this.form.addControl("searchControl", new FormControl(""));
            this.getMarker();
            //this.getDistance();
            this.getCabelTypes();
            this.mapService.getMarker()
                .subscribe((value) => {
                    debugger;
                    var NEArr = [];
                    for (let v in value) {
                        var NEList = {
                            label: "",
                            value:""
                        };
                        NEList.label = value[v]; 
                        NEList.value = value[v];
                        NEArr.push(NEList);
                    }
                    this.markerTypes = NEArr;
                });
            this.mapService.getCableTypes()
                .subscribe((value) => {
                    debugger;
                    var CAArr = [];
                    for (let c in value) {
                        var CAList = {
                            label: "",
                            value: ""
                        };
                        CAList.label = value[c];
                        CAList.value = value[c];
//console.log(c);
                        CAArr.push(CAList);
                    }
                    this.cabelTypes = CAArr;
                });

            //function(value) {
            //    return this.markerTypes = value
            //}
            //console.log(this.markerTypes);
            //        // this.searchElementRef = this.form.value["searchControl"];
            
    //        // set google maps defaults
            this.zoom = 6;
            this.lat = 4.210484;
            this.lng = 101.97576600000002;

            // create search FormControl
            // this.searchControl = new FormControl();

            // set current position
            this.setCurrentPosition();

            // load Places Autocompletes
            this.mapsAPILoader.load().then(() => {
                let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                    types: ["address"]
                });
                autocomplete.addListener("place_changed", () => {
                    this.ngZone.run(() => {
                        // get the place result

                        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                        // verify result
                        if (place.geometry === undefined || place.geometry === null) {
                            return;
                        }

                        // set latitude, longitude and zoom
                        debugger;
                        this.lat = place.geometry.location.lat();
                        this.lng = place.geometry.location.lng();
                        var point = "POINT(" + this.lat + " " + this.lng + ")";
                        this.mapService.load(point).subscribe;
                        this.zoom = 12;
                        //this.openNav();
                    });
                });
            });

            //document.getElementsByTagName("sebm-google-map")[0].style.height = screen.height;
        }

        private setCurrentPosition() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    this.latitude = this.lat;
                    this.longitude = this.lng;
                    this.zoom = 12;
                });
            }
        }
    }


////  just an interface for type safety.
interface IMarker {
    lat: number;
    lng: number;
    label?: string;
    type?: string;
    icon?: string;
}

interface ICable {
    points: IMarker[];
    label: string;
    type: string;
    color: string;
}

