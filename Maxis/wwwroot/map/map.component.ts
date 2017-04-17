
import { Component, NgModule, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';
import { Map } from './shared/map.interface';
import { MapService } from './shared/map.service';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DropdownModule } from "ngx-dropdown";
import { NEComponent } from './../NEtype/ne.component';
//import { ThreshComponent } from './../Threshold/thresh.component';
//import { ThresholdComponent } from './../../Threshold/thresh.component';

import { LogoutComponent } from './../logout/logout.component';
import { SelectModule } from 'angular2-select';
declare var google: any;
@Component({
    selector: 'map',
    templateUrl: 'wwwroot/map/map.component.html',
    styleUrls: ['wwwroot/map/map.component.css']
})

export class MapComponent implements OnInit {
    errorMessage: string;
    //public maps: Map[];
    private neNameData;
    private data;
    selectedMap: Map;


    onSelect(map: Map) {
        this.selectedMap = map;
    }
    markerTypes: any[];
    cableTypes: any[];
    buildLRD: any[];
    buildingNames: any[];
    structNames: any[];
    getMarker() { }

    getBuilding() { }
    getCabelTypes() { }
    getCable() { }
    getStruct() { }
    getLRD() { }
    imgSize: number = 24;
    name: string = "Accionlabs";
    zoom: number = 18;
    //  initial center position for the map



    lat: number = 3.15104206724095;
    lng: number = 101.663805603203;
    markerNumber: string = "";

    //markers: ICable[];
    //points: IMarker[];
    points: IMarker[];
    //points = this.getLRD();
    // NEName = this.getThreshold();
    buildings: any[];
    structs: IMarker[];
    cables: IMarker[];
    markers: ICable[];
    distance = this.getDistance();
    getDistance(): any[] {
        return [
            {
                value: "20",
                label: "within 20 km"
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
                label: "within 200 km"

            }
        ];
    };

    cabelTypes: any[];
    cabelNames = this.getCabelNames([]);


    //clickedMarker(label: string, index: number): void {
    //    console.log(`clicked the marker: ${label || index}`);
    //    var marker = this.points.filter(function (value:any , index: number, array: any[]) {
    //        return value.label === label;
    //    })[0];
    //    console.log(marker);
    //    this.buildings = this.getBuildings(marker);
    //    console.log(this.buildings);
    //}

    //mapClicked($event: MouseEvent) {
    //    this.markers.push({
    //        lat : $event.coords.lat,
    //        lng: $event.coords.lng
    //    });
    //}

    //    markerDragEnd(m: IMarker, $event: MouseEvent): void {
    //        consolgete.log("dragEnd", m, $event);
    //    }

    getCables(cableID): ICable[] {
        var cableVal = this.cableTypes;
        var CableArr = [];
        for (let v in cableVal) {
            var CableList = {
                label: "",
                type: "Aerial",
                color: "skyblue",
                CableId: 0,
                //  icon: "../../Content/Images/placeholder-" + this.imgSize + "-black.png",
                icon: "../../Content/Images/placeholder-24-black.png",
                points: []
            };
            if (cableID[0] == "selectAll" || (cableID == cableVal[v].value || cableID.indexOf(cableVal[v].value) > -1)) {
                CableList.label = cableVal[v].label;
                CableList.type = "Aerial";
                CableList.color = "skyblue";
                CableList.points = [];
                CableList.CableId = cableVal[v].value;
                CableList.icon = "../../Content/Images/placeholder-24-black.png";
                //if (!cableVal[v].Geodata)
                //  cableVal[v].Geodata = 'LINESTRING(103.903083 1.730833, 103.902516698374 1.73121879229169)';

                var currGeoData = cableVal[v].Geodata.replace("LINESTRING (", "").replace(")", "").split(", ");
                var gArr = [];
                for (let v in currGeoData) {
                    var gData = { lng: 0, lat: 0, label: "" };

                    gData.lng = parseFloat(currGeoData[v].split(" ")[0]);
                    gData.lat = parseFloat(currGeoData[v].split(" ")[1]);
                    gData.label = CableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                }
                CableList.points = gArr;
                CableArr.push(CableList);
            }

        }
        console.log(CableArr);
        return CableArr;
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
        /// var p: IMarker = this.points.filter(p => p.label === this.form.value["selectSingle"])[0];
        //this.lat = p.lat;
        // this.lng = p.lng;
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
    //markers: IMarker[];
    onLRDSelected(item: any) {
        this.logMultiple("- selected (value: " + item.value + ", label:" + item.label + " ,role:" + item.role + ")");
        this.mapService.getNEtypes(this.form.value["selectMultiple"][0].LrdName)
            .subscribe((value) => {
                var NEArr = [];

                for (let v in value) {
                    var NEList = {
                        label: "",
                        value: "",
                        role: ""
                    };

                    NEList.label = value[v].NetworkElementName;
                    NEList.value = value[v].NetworkElementType;
                    NEList.role = value[v].Role;

                    NEArr.push(NEList);
                }
                this.neNameData = NEArr;

            });

        var NEArr = [];
        var NEList = {
            label: "",
            value: "",
            type: "",
            lng: 0,
            lat: 0,
            icon: "../../Content/Images/satellite-dish-24-blue.png"
        };
        var currVal = this.form.value["selectMultiple"];
        for (let v in currVal) {
            NEList = {
                label: "",
                value: "",
                type: "",
                lng: 0,
                lat: 0,
                icon: "../../Content/Images/satellite-dish-24-blue.png"
            };
            NEList.label = currVal[v].LrdName;
            NEList.value = currVal[v].LrdName;
            NEList.type = "Ethernet Switch";
            NEList.icon = "../../Content/Images/satellite-dish-24-blue.png";
            var pt = currVal[v].GeodataValue;
            NEList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
            NEList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
            NEArr.push(NEList);
        }
        console.log(NEArr);
        this.points = NEArr;



        //this.markerNames = this.getMarkerNames(this.form.value["selectMultiple"]);
    }


    onStructSelected(item: any, cableId1: any) {
        var obj = {
            CableId: "0",
            range: 0,
            searchpoint: "POINT (0,0)"
        };
        obj.range = parseInt(this.form.value["selectedDistance"]);
        obj.searchpoint = "POINT (" + item.lng + " " + item.lat + ")";
        //obj.searchpoint = "POINT (101.594202549788 3.0506066924328)";
        //obj.CableId = cableId;
        obj.CableId = cableId1;
        this.structs = [];
        this.mapService.getStruct(obj)
            .subscribe((value: any) => {
                for (var v in value) {
                    var StructList = {
                        label: "",
                        value: "",
                        type: "",
                        lng: 0,
                        lat: 0,
                        icon: "../../Content/Images/flats-24-blue.png"
                    };
                    StructList.label = value[v].StructureName;
                    StructList.value = value[v].StructureId;
                    StructList.type = value[v].StructureOtName;
                    if (StructList.type == "Manhole") {
                        StructList.icon = "../../Content/Images/manhole_16.png";
                    } else if (StructList.type == "Site Location") {
                        StructList.icon = "../../Content/Images/world-web.png";
                    }
                    else if (StructList.type == "Fiber Cable") {
                        StructList.icon = "../../Content/Images/fiber_cable_16.png";
                    }
                    else if (StructList.type == "Pole") {
                        StructList.icon = "../../Content/Images/pole_16.png";
                    }
                    else if (StructList.type == "Handhole") {
                        StructList.icon = "../../Content/Images/handhold_16.png";
                    }
                    else if (StructList.type == "Junction Box") {
                        StructList.icon = "../../Content/Images/_junction_box.png";
                    }
                    else if (StructList.type == "Customer Site Location") {
                        StructList.icon = "../../Content/Images/home.png";
                    }




                    var pt = value[v].Geodata;
                    StructList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                    StructList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
                    this.structs.push(StructList);
                }
            });
    }

    onBuildingSelected(item: any) {
        var cableArr = [];
        var LRD = this.form.value["selectMultiple"];
        //var bd = this.form.value["selectSingle"];


        //this.mapService.getNEtypes(this.form.value["selectMultiple"])
        //    .subscribe((value) => {
        //        var NEArr = [];
        //        for (let v in value) {
        //            var NEList = {
        //                label: "",
        //                value: "",
        //                role:" "
        //            };
        //            NEList.label = value[v].NetworkElementName;
        //            NEList.value = value[v].NetworkElementType;
        //            NEList.role = value[v].Role;
        //            NEArr.push(NEList);
        //        }
        //    });
        //  this.buildings = [];
        //item this.form.value["selectSingle"]
        this.data = this.form.value["selectSingle"];
        this.buildings = [];
        for (let b in this.buildingNames) {
            var currBuilding = this.buildingNames[b];
            for (let s in this.data) {
                var currSelBuilding = this.data[s];
                if (this.data[s] == currBuilding.value) {
                    console.log(currBuilding.lrd);
                    this.buildings.push(currBuilding);
                }
            }
        }

        var newBuilding = [];

        // if (item[0] == "selectAll" || (item == pt.value || item.indexOf(pt.value) > -1)) {
        for (let v in this.buildings) {
            var BuildingList = {
                label: "",
                value: "",
                lrd: "",
                type: "",
                lng: 0,
                lat: 0,
                icon: "../../Content/Images/flats-24-blue.png"
            };
            BuildingList.label = this.buildings[v].label;
            BuildingList.value = this.buildings[v].value;
            BuildingList.lrd = this.buildings[v].lrd;
            BuildingList.type = "Building";
            BuildingList.icon = "../../Content/Images/flats-24-blue.png";
            var pt = this.data[v];
            BuildingList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
            BuildingList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))

            this.buildings.push(BuildingList);
            newBuilding.push(BuildingList);
            for (let v in LRD) {
                var CableList = {
                    label: "",
                    type: "Aerial",
                    color: "black",
                    CableId: 0,
                    //  icon: "../../Content/Images/placeholder-" + this.imgSize + "-black.png",
                    icon: "../../Content/Images/placeholder-24-black.png",
                    points: []
                };
                LRD[v].LrdName = this.buildings[v].lrd;
                if (LRD[v].LrdName == this.buildings[v].lrd) {
                    BuildingList.label = this.buildings[v].label;
                    BuildingList.value = this.buildings[v].value;
                    BuildingList.lrd = this.buildings[v].lrd;

                    BuildingList.type = "Building";
                    BuildingList.icon = "../../Content/Images/flats-24-blue.png";
                    //if (!item[v].Geodata)
                    //    item[v].Geodata = 'LINESTRING(103.903083 1.730833, 103.902516698374 1.73121879229169)';

                    var currGeoData = this.buildings[v].value.replace("POINT (", "").replace(")", "").split(", ");
                    var gArr = [];
                    for (let v in currGeoData) {
                        var gData = { lng: 0, lat: 0, label: "" };

                        gData.lng = parseFloat(currGeoData[v].split(" ")[0]);
                        gData.lat = parseFloat(currGeoData[v].split(" ")[1]);
                        gData.label = CableList.label + gData.lng + "_" + gData.lat;
                        gArr.push(gData);
                    }
                    CableList.points = gArr;
                    newBuilding.push(CableList);
                }

            }
            console.log(newBuilding);
            this.buildLRD = JSON.parse("[{ \"label\":\"DEJJ0011144T01F\",\"type\":\"Aerial\",\"color\":\"skyblue\",\"CableId\":\"9110439617013031211\",\"icon\":\"../../Content/Images/placeholder-24-black.png\",\"points\":[{\"lng\":103.803877976925,\"lat\":1.5423787855778,\"label\":\"DEJJ0011144T01F103.803877976925_1.5423787855778\"},{\"lng\":103.804006963172,\"lat\":1.54214807516075,\"label\":\"DEJJ0011144T01F103.804006963172_1.54214807516075\"}]}]");
            //this.buildings = newBuilding;

        }

    }
    // this.buildings = buildings;
    //onMultipleSelectedCable(item: any) {

    //    this.cables = [];
    //   // item this.form.value["selectMultiple"]

    //    var CableList = {
    //        label: "",
    //        value: "",
    //        type: "",
    //        lng: 0,
    //        lat: 0,
    //        icon: "../../Content/Images/placeholder-24-blue.png"
    //    };
    //    CableList.label = item.label;
    //    CableList.value = item.value;
    //    CableList.type = "Cable";
    //    CableList.icon = "../../Content/Images/placeholder-24-blue.png";
    //    var pt = CableList.value;
    //    CableList.lng = parseInt(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
    //    CableList.lat = parseInt(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
    //    this.cables.push(CableList);
    //}



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
        this.zoom = 10;
        this.logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
        this.mapService.getLRD(item)
            .subscribe((value) => {
                var NEArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: 'selectAll'

                }

                NEArr.push(selectAll);

                var NEList = {
                    label: "",
                    value: "",
                    type: "",
                    lng: 0,
                    lat: 0,
                    icon: "../../Content/Images/satellite-dish-24-blue.png"
                };
                for (let v in value) {
                    NEList = {
                        label: "",
                        value: "",
                        type: "",
                        lng: 0,
                        lat: 0,
                        icon: "../../Content/Images/satellite-dish-24-blue.png"
                    };
                    NEList.label = value[v].LrdName;
                    NEList.value = value[v];
                    NEList.type = "Ethernet Switch";
                    NEList.icon = "../../Content/Images/satellite-dish-24-blue.png";
                    var pt = value[v].GeodataValue;
                    NEList.lng = parseInt(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                    NEList.lat = parseInt(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
                    NEArr.push(NEList);
                }
                console.log(NEArr);
                //this.points = NEArr;
                this.markerTypes = NEArr;
            });

        this.mapService.getBuilding(item)
            .subscribe((value) => {
                var NEArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: 'selectAll'

                }

                NEArr.push(selectAll);
                for (let v in value) {
                    var NEList = {
                        label: "",
                        value: "",
                        lrd: ""
                    };
                    NEList.label = value[v].BuildingName;
                    NEList.value = value[v].Geodata;
                    NEList.lrd = value[v].Lrd;
                    NEArr.push(NEList);
                }
                // this.buildings = NEArr;

                this.buildingNames = NEArr;
            });
        ///structure//

        //this.mapService.getStruct(item)
        //    .subscribe((value) => {
        //        var NEArr = [];
        //        var selectAll = {
        //            label: 'selectAll',
        //            value: 'selectAll'

        //        }

        //        NEArr.push(selectAll);

        //        for (let v in value) {
        //            var NEList = {
        //                label: "",
        //                value: "",
        //            };
        //            NEList.label = value[v];
        //            NEList.value = value[v];
        //            NEArr.push(NEList);
        //        }
        //        this.structs = NEArr;

        //        this.structNames = NEArr;
        //    });







        this.mapService.getCable(item)
            .subscribe((value) => {
                var CableArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: 'selectAll'

                }

                CableArr.push(selectAll);

                for (let v in value) {
                    var CableList = {
                        label: "",
                        value: "",
                        Geodata: ""
                    };
                    CableList.label = value[v].CableName;
                    CableList.value = value[v].CableId;
                    CableList.Geodata = value[v].Geodata;
                    CableArr.push(CableList);
                }
                this.cableTypes = CableArr;
            });



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
    //onCableDeselected(item: any) {
    //    this.logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    //   // this.markers = this.getCables(this.form.value["selectSingle1"]);
    //}

    onCableSelected(item: any) {
        this.zoom = 12;
        //console.log(this.cableTypes = NEArr;
        //this.mapService.getStruct(item.value)
        //    .subscribe(
        //    data =>  this.onStructSelected(item) )
        this.markers = this.getCables(this.form.value["selectSingle1"]);
        var p = this.markers.filter(p => p.label === this.form.value["selectSingle1"])[0];
        // var p: ICable = this.markers.filter(p => p.label === "DSH10033048D01F")[0];
        // this.lat = p.points
        //     .reduce<number>((sum, a, i, ar) =>
        //     {
        //         sum += a.lat;
        //         return i == ar.length - 1 ? (ar.length == 0 ? 0 : sum / ar.length) : sum;
        //     }, 0);  

        // this.lng = p.points
        //     .reduce<number>((sum, a, i, ar) => {
        //         sum += a.lng;
        //         return i == ar.length - 1 ? (ar.length == 0 ? 0 : sum / ar.length) : sum;
        //     }, 0);  
        //this.lat = p.points[Math.round(p.points.length / 2)].lat;
        //this.lng = p.points[Math.round(p.points.length / 2)].lng;
        //this.zoom = 18;
        this.logMultiple("- selected (value: " + item.value + ", label:" + item.label + ")");
        //this.logSingle("- selected (value: " + item.value + ", label:" +
        //  item.label + ")");
        // this.cabelTypes = this.getCable(this.form.value["selectMultiple1"]);
        //this.closeNav();
    }

    onMultipleDeselected1(item: any) {
        this.logMultiple("- deselected (value: " + item.value + ", label:" + item.label + ")");
        // this.cabelTypes = this.getCable(this.form.value["selectMultiple1"]);
    }

    check(checked) {

        if (checked) {
            // checked
        } else {
            // not checked
        }
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
    isAvailable = true;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private router: Router, private mapService: MapService,

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
        this.form.addControl("selectedDistance", new FormControl(""));

        // this.getMarker();
        //this.getDistance();
        this.getCabelTypes();
        this.getBuilding();
        this.getCable();
        this.getLRD();
        //this.getStructure();
        //this.mapService.getBuilding()
        //    .subscribe((value) => {
        //        debugger;
        //        var NEbuild = [];
        //        for (let b in value) {
        //            var building = [];

        //            building.label = value[b];
        //            building.value = value[b];
        //            NEbuild.push(building);
        //        }
        //        this.markerNames = NEbuild;
        //    });
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
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    var point = "POINT(" + this.lng + " " + this.lat + ")";
                    // Service -> Set Distance with Point
                    this.mapService.getload(point).subscribe;
                    this.zoom = 8;
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

// just an interface for type safety.
interface ImarkerTest {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

