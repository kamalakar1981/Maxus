
import { Component, NgModule, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';
import { IMarker, ICable } from './shared/map.interface';
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
   public neNameData;
    private _data;
    selectedMap: any;

    constructor(
        private _mapsAPILoader: MapsAPILoader,
        private _ngZone: NgZone,
        private _router: Router, private _mapService: MapService,

    ) { }
    @ViewChild("search")
    public searchElementRef: ElementRef;
    isAvailable = true;


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

       this.zoom = 6;
        this.lat = 4.210484;
        this.lng = 101.97576600000002;



        this._setCurrentPosition();

        // load Places Autocompletes
        this._mapsAPILoader.load().then(() => {

            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this._ngZone.run(() => {
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
                    this._mapService.getload(point).subscribe;
                    this.zoom = 8;
                });
            });
        });

    }

    onSelect(map: any) {
        this.selectedMap = map;
    }
    markerTypes: any[];
    cableTypes: any[];
    buildLRD: any[];
    buildingNames: any[];
    structNames: any[];
    imgSize: number = 24;
    name: string = "Accionlabs";
    zoom: number = 18;
    //  initial center position for the map
    public latitude: number;
    public longitude: number;

    styles : any[] = [

            {
                featureType: "poi",
                stylers: [
                    { visibility: "off" }
                ]
            }
];

    lat: number = 3.15104206724095;
    lng: number = 101.663805603203;
    markerNumber: string = "";
    cabelTypes: any[];
    cabelNames = this.getCabelNames([]);

    points: IMarker[];
    buildings: any[];
    structs: IMarker[];
    cables: IMarker[];
    markers: ICable[];
    distance = this.getDistance();
    getDistance(): any[] {
        return [
            {
                value: "10",
                label: "within 10 km"
            },
            {
                value: "20",
                label: "within 20 km"
            },
            {
                value: "30",
                label: "within 30 km"
            },
            {
                value: "40",
                label: "within 40 km"
            },
            {
                value: "50",
                label: "within 50 km"
            },
            {
                value: "60",
                label: "within 60 km"
            },
            {
                value: "70",
                label: "within 70 km"
            },
            {
                value: "80",
                label: "within 80 km"
            },
            {
                value: "90",
                label: "within 90 km"
            },
            {
                value: "100",
                label: "within 100 km"
            }
        ];
    };

   

   
    getCables(cableID): ICable[] {

        var cableVal = this.cableTypes;
        var cableArr = [];

        for (let v in cableVal) {
            var cableList = {
                label: "",
                type: "Aerial",
                color: "skyblue",
                CableId: 0,
                icon: "../../Content/Images/placeholder-24-black.png",
                points: []
            };
            if (cableID[0] == "selectAll" || (cableID == cableVal[v].value || cableID.indexOf(cableVal[v].value) > -1)) {
                cableList.label = cableVal[v].label;
                cableList.type = "Aerial";
                cableList.color = "skyblue";
                cableList.points = [];
                cableList.CableId = cableVal[v].value;
                cableList.icon = "../../Content/Images/placeholder-24-black.png";
                //need for reference for select
               if (!cableVal[v].Geodata)
                    cableVal[v].Geodata = '';
               
                var currGeoData = cableVal[v].Geodata.replace("LINESTRING (", "").replace(")", "").split(", ");
                var gArr = [];
                for (let v in currGeoData) {
                    var gData = { lng: 0, lat: 0, label: "" };

                    gData.lng = parseFloat(currGeoData[v].split(" ")[0]);
                    gData.lat = parseFloat(currGeoData[v].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                }
                cableList.points = gArr;
                cableArr.push(cableList);
            }

        }
        return cableArr;
    };
    getBuildings(marker: IMarker): IMarker[] {
        var arr = [
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
        ].filter(a => types.indexOf(a.type) != -1);
    }


    getCabelNames(types: string[]): any[] {
        return [
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
        this._logSingle("- opened");
    }

    onSingleClosed() {
        this._logSingle("- closed");
    }

    onSingleSelected(item: any) {
        this._logSingle("- selected (value: " + item.value + ", label:" + item.label + ")");
        }

    onSingleDeselected(item: any) {
        this._logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }

    onMultipleOpened() {
        this._logMultiple("- opened");
    }

    onMultipleClosed() {
        this._logMultiple("- closed");
    }
    //markers: IMarker[];
    onLRDSelected(item: any) {
        this._logMultiple("- selected (value: " + item.value + ", label:" + item.label + " ,role:" + item.role + ")");
       
        var neArr = [];
        var neList = {
            label: "",
            value: "",
            type: "",
            lng: 0,
            lat: 0,
            icon: "../../Content/Images/satellite-dish-24-blue.png"
        };
        var currVal = this.form.value["selectMultiple"];
        for (let v in currVal) {
            neList = {
                label: "",
                value: "",
                type: "",
                lng: 0,
                lat: 0,
                icon: "../../Content/Images/satellite-dish-24-blue.png"
            };

            neList.label = currVal[v].LrdName;
            neList.value = currVal[v].LrdName;
            neList.type = "Ethernet Switch";
            neList.icon = "../../Content/Images/satellite-dish-24-blue.png";
            var pt = currVal[v].GeodataValue;
            neList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
            neList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
            neArr.push(neList);
        }
        this.points = neArr;
    }
    addtable(item: any) {
        this._logMultiple("- selected (value: " + item.value + ", label:" + item.label + " ,role:" + item.role + ")");
        for (let v in this.form.value["selectMultiple"]) {


            var lrdArray = (this.form.value["selectMultiple"][v].LrdName + ",") + lrdArray;
        }
        


        this._mapService.getNEtypes(lrdArray)
            .subscribe((value) => {
                var neArr = [];

                for (let v in value) {
                    var neList = {
                        label: "",
                        value: "",
                        role: ""
                    };

                    neList.label = value[v].NetworkElementName;
                    neList.value = value[v].NetworkElementType;
                    neList.role = value[v].Role;

                    neArr.push(neList);
                }
                this.neNameData = neArr;

            });

    }

    onStructSelected(item: any, cableId1: any) {
        var obj = {
            CableId: "0",
            range: 0,
            searchpoint: "POINT (0,0)"
        };
        obj.range = parseInt(this.form.value["selectedDistance"]);
        obj.searchpoint = "POINT (" + item.lng + " " + item.lat + ")";
        obj.CableId = cableId1;
        this.structs = [];
        this._mapService.getStruct(obj)
            .subscribe((value: any) => {
                for (var v in value) {
                    var structList = {
                        label: "",
                        value: "",
                        type: "",
                        lng: 0,
                        lat: 0,
                        icon: "../../Content/Images/flats-24-blue.png"
                    };
                    structList.label = value[v].StructureName;
                    structList.value = value[v].StructureId;
                    structList.type = value[v].StructureOtName;
                    if (structList.type == "Manhole") {
                        structList.icon = "../../Content/Images/manhole_16.png";
                    } else if (structList.type == "Site Location") {
                        structList.icon = "../../Content/Images/world-web.png";
                    }
                    else if (structList.type == "Fiber Cable") {
                        structList.icon = "../../Content/Images/fiber_cable_16.png";
                    }
                    else if (structList.type == "Pole") {
                        structList.icon = "../../Content/Images/pole_16.png";
                    }
                    else if (structList.type == "Handhole") {
                        structList.icon = "../../Content/Images/handhold_16.png";
                    }
                    else if (structList.type == "Junction Box") {
                        structList.icon = "../../Content/Images/_junction_box.png";
                    }
                    else if (structList.type == "Customer Site Location") {
                        structList.icon = "../../Content/Images/home.png";
                    }
                    var pt = value[v].Geodata;
                    structList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                    structList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
                    this.structs.push(structList);
                }
            });
    }

    onBuildingSelected(item: any) {
        this._data = this.form.value["selectSingle"];
        this.buildings = [];
        for (let b in this.buildingNames) {
            var currBuilding = this.buildingNames[b];
            for (let s in this._data) {
                var currSelBuilding = this._data[s];
                if (this._data[s] == currBuilding.value) {
                    this.buildings.push(currBuilding);
                }
            }
        }

        var newBuilding = [];

        for (let v in this.buildings) {
            var buildingList = {
                label: "",
                value: "",
                lrd: "",
                type: "",
                lng: 0,
                lat: 0,
                icon: "../../Content/Images/flats-24-blue.png",
                points: []
            };
            if (this.buildingNames[0].label == "selectAll" || (this.buildingNames == this.buildings[v].value || this.buildingNames.indexOf(this.buildings[v].value) > -1)) {

                buildingList.label = this.buildings[v].label;
                buildingList.value = this.buildings[v].value;
                buildingList.lrd = this.buildings[v].lrd;
                buildingList.type = "Building";
                buildingList.icon = "../../Content/Images/flats-24-blue.png";
                if (!this.buildings[v].value)
                    this._data[v] = '';
                var pt = this._data[v];
                buildingList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                buildingList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))

                this.buildings.push(buildingList);
          }
        }
      }


    onBuildconnectivity(item: any) {
         var cableArr = [];
        var LRD = this.form.value["selectMultiple"];
        var newBuilding = [];

            for (let v in LRD) {
                    var cableList = {
                        CableId: "",
                        label: "",
                        type: "Aerial",
                        color: "Navy",
                        icon: "../../Content/Images/placeholder-24-black.png",
                        points: []
                    };
                    LRD[v].LrdName = this.buildings[v].lrd;
                    if (LRD[v].LrdName == this.buildings[v].lrd) {
                        cableList.CableId = this.buildings[v].value;
                        cableList.label = this.buildings[v].label;

                        cableList.type = "Building";
                        cableList.icon = "../../Content/Images/flats-24-blue.png";
                        
                        var currGeoData = this.buildings[v].value.replace("POINT (", "").replace(")", "").split(", ");
                        var gArr = [];
                        for (let v in currGeoData) {
                            var gData = { lng: 0, lat: 0, label: "" };

                            gData.lng = parseFloat(currGeoData[v].split(" ")[0]);
                            gData.lat = parseFloat(currGeoData[v].split(" ")[1]);
                            gData.label = cableList.label + gData.lng + "_" + gData.lat;
                            gArr.push(gData);
                            gData = { lng: 0, lat: 0, label: "" };
                            var currLRd = LRD[v].GeodataValue.replace("POINT (", "").replace(")", "").split(", ");
                            gData.lng = parseFloat(currLRd[v].split(" ")[0]);
                            gData.lat = parseFloat(currLRd[v].split(" ")[1]);
                            gData.label = cableList.label + gData.lng + "_" + gData.lat;
                            gArr.push(gData);

                        }


                        cableList.points = gArr;
                        newBuilding.push(cableList);
                    }

                }
                this.buildLRD = newBuilding;
                return this.buildLRD;

            }

     onSingleOpened1() {
        this._logSingle("- opened");
    }

    onSingleClosed1() {
        this._logSingle("- closed");
    }


    onSingleSelected1(item: any) {
        this._logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
    }


    onSingleSelected2(item: any) {
        this.zoom = 10;
        this._logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
        this._mapService.getLRD(item)
            .subscribe((value) => {
                var neArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: 'selectAll'

                }

                neArr.push(selectAll);

                var neList = {
                    label: "",
                    value: "",
                    type: "",
                    lng: 0,
                    lat: 0,
                    icon: "../../Content/Images/satellite-dish-24-blue.png"
                };

                for (let v in value) {
                    neList = {
                        label: "",
                        value: "",
                        type: "",
                        lng: 0,
                        lat: 0,
                        icon: "../../Content/Images/satellite-dish-24-blue.png"
                    };
                    neList.label = value[v].LrdName;
                    neList.value = value[v];
                    neList.type = "Ethernet Switch";
                    neList.icon = "../../Content/Images/satellite-dish-24-blue.png";
                    var pt = value[v].GeodataValue;
                    neList.lng = parseInt(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                    neList.lat = parseInt(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
                    neArr.push(neList);
                }
                this.markerTypes = neArr;
            });

        this._mapService.getBuilding(item)
            .subscribe((value) => {
                var neArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: '',
                    lrd:''

                }

                neArr.push(selectAll);
                for (let v in value) {
                    var neList = {
                        label: "",
                        value: "",
                        lrd: ""
                    };
                    neList.label = value[v].BuildingName;
                    neList.value = value[v].Geodata;
                    neList.lrd = value[v].Lrd;
                    neArr.push(neList);
                }

                this.buildingNames = neArr;
            });
        

        this._mapService.getCable(item)
            .subscribe((value) => {
                var cableArr = [];
                var selectAll = {
                    label: 'selectAll',
                    value: 'selectAll'

                }

                cableArr.push(selectAll);

                for (let v in value) {
                    var cableList = {
                        label: "",
                        value: "",
                        Geodata: ""
                    };
                    cableList.label = value[v].CableName;
                    cableList.value = value[v].CableId;
                    cableList.Geodata = value[v].Geodata;
                    cableArr.push(cableList);
                }
                this.cableTypes = cableArr;
            });
        }

    onSingleDeselected2(item: any) {
        this._logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }


    onSingleDeselected1(item: any) {
        this._logSingle("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }

    onMultipleOpened1() {
        this._logMultiple("- opened");
    }

    onMultipleClosed1() {
        this._logMultiple("- closed");
    }
   
    onCableSelected(item: any) {
        this.markers = this.getCables(this.form.value["selectSingle1"]);
        var p = this.markers.filter(p => p.label === this.form.value["selectSingle1"])[0];
        this._logMultiple("- selected (value: " + item.value + ", label:" + item.label + ")");
       }

    onMultipleDeselected1(item: any) {
        this._logMultiple("- deselected (value: " + item.value + ", label:" + item.label + ")");
    }

    
    private _logSingle(msg: string) {
        this.logSingleString += msg + "\n";
     }

    private _logMultiple(msg: string) {
        this.logMultipleString += msg + "\n";
        }

    private _scrollToBottom(elem: any) {
        elem.scrollTop = elem.scrollHeight;
    }

    
    private _setCurrentPosition() {
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



