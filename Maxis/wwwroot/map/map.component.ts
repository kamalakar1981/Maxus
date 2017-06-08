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
import { LogoutComponent } from './../logout/logout.component';
import { SelectModule } from 'angular2-select';
declare var google: any;

@Component({
    selector: 'map',
    templateUrl: 'wwwroot/map/map.component.html',
    styleUrls: ['wwwroot/map/map.component.css']
})

export class MapComponent implements OnInit {
    errorMsg: string;
    mapInvalid = false;
    Map: any;
    
    public neNameData;
    public user = sessionStorage.getItem('currentUser');
    public role = sessionStorage.getItem('userrole');
    private _data;
    year = new Date().getFullYear();
    selectedMap: any;

    constructor(
        private _mapsAPILoader: MapsAPILoader,
        private _ngZone: NgZone,
        private _router: Router, private _mapService: MapService  
    ) { }

    @ViewChild("search")
    public searchElementRef: ElementRef;
    isAvailable = true;
    selectMultiple1: any;
    selectSingle1: any;
    foo: any[];
    buildingLoad: any;
    distanceLoad: any;
    lrdLoad: any;
    cableLoad: any;
    points = [];
    buildings = [];
    structs = [];
    cables = [];
    markers = [];
    dist: any[];
    markerTypes: any[];
    cableTypes: any[];
    buildLRD: any[];
    buildingNames: any[];
    structNames: any[];
    multiple0: boolean = false;
    multiple1: boolean = true;
    options0: Array<any> = [];
    options1: Array<any> = [];
    selection: Array<string>;
    public latitude: number;
    public longitude: number;
    zoom: number = 18;
    markerNumber: string = "";
    cabelTypes: any[];
    form: FormGroup;

    @ViewChild("preSingle") preSingle: ElementRef;
    @ViewChild("preMultiple") preMultiple: ElementRef;
    logSingleString: string = "";
    logMultipleString: string = "";

    ngOnInit() {
        var load = "Loading....";
        this.buildingLoad = load;
        this.distanceLoad = load;
        this.lrdLoad = load;
        this.cableLoad = load;
        this.form = new FormGroup({});
        this.form.addControl("selectSingle", new FormControl(""));
        this.form.addControl("selectMultiple", new FormControl(""));
        this.form.addControl("selectSingle1", new FormControl(""));
        this.form.addControl("selectMultiple1", new FormControl(""));
        this.form.addControl("searchControl", new FormControl(""));
        this.form.addControl("selectedDistance", new FormControl(""));

        this.zoom = 6;
        //  initial center position for the map

        this.lat = 4.210484;
        this.lng = 101.97576600000002;
        this._setCurrentPosition();
       
        // load Places Autocompletes
        this._mapsAPILoader.load().then(() => {
            var map;
            var autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
            google.maps.event.addListener(autocomplete, 'place_changed', () => {
                this._ngZone.run(() => {
                    var place = autocomplete.getPlace();
                    this.markers.push({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        label: place.name
                });
                    this.points = [];
                    this.buildings = [];
                    this.buildLRD = [];
                    this.structs = [];
                    this.markers = [];
                    this.lat = place.geometry.location.lat();
                    this.lng = place.geometry.location.lng();
                    var point = "POINT(" + this.lng + " " + this.lat + ")";
                    this.form.reset();

                    this._mapService.getload(point).subscribe(
                        data => {
                            var allDistance = [];
                            var distval = 0;
                            for (let i = data.Range; i <= 100; i = i + 10) {
                                allDistance[distval] = i;
                                distval++;
                            }
                            this.getDistance(allDistance);
                        },
                        err => {
                            this.mapInvalid = true;
                            this.errorMsg = 'Something went wrong . please try again later !';
                        }
                    );
                    this.zoom = 8;
                });
            });
        });
    }
    
    onSelect(map: any) {
        this.selectedMap = map;
    }

    styles: any[] = [

        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    lat: number = 3.15104206724095;
    lng: number = 101.663805603203;
    getDistance(distval): void {

        this.dist = [];
        var _dist = [];
        distval.map(function (val) {
            _dist.push({ value: val.toString(), label: val.toString() });
        });
        this.dist = _dist;
        var distance = this;
        setTimeout(function () {
            distance.form.controls['selectedDistance'].setValue(_dist[0].value);
            }
            , 1000);
        this.onDistanceSelected(_dist[0]);
        this.distanceLoad = "Select Distance";
    };
    getCables(cableID): ICable[] {
        var cableVal = this.cableTypes;
        var cableArr = [];
        this.structs = [];
        this.cables = [];
        for (let v in cableVal) {
            var cableList = {
                label: "",
                type: "Aerial",
                color: "skyblue",
                CableId: 0,
                icon: "../../Content/Images/placeholder-24-black.png",
                points: []
            };
            if (cableID[0] == "Select All" || (cableID == cableVal[v].value || cableID.indexOf(cableVal[v].value) > -1)) {
                
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
                    var gData = { lng: 0, lat: 0, label: "" ,lab:""};
                    gData.lng = parseFloat(currGeoData[v].split(" ")[0]);
                    gData.lat = parseFloat(currGeoData[v].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gData.lab = cableList.label;
                    gArr.push(gData);
                }
                cableList.points = gArr;
                cableArr.push(cableList);
               
            }
        }
        return cableArr;
    };
   
   

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
    onLRDSelected(item: any) {
        this._logMultiple("- selected (value: " + item.value + ", label:" + item.label + " ,role:" + item.role + ")");
        this.points = [];
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
        if (currVal[0] == "Select All") {
            var lrdval = this.markerTypes;

            for (var v = 1; v <= lrdval.length - 1; v++) {
                neList.label = lrdval[v].label;
                neList.value = lrdval[v].label;
                neList.type = "Ethernet Switch";
                neList.icon = "../../Content/Images/satellite-dish-24-blue.png";
                var pt = lrdval[v].value.GeodataValue;
                neList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                neList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                neArr.push(neList);
                this.points = neArr;

            }
            return true;
        }
        else {
            for (let v in currVal) {
                neList.label = currVal[v].LrdName;
                neList.value = currVal[v].LrdName;
                neList.type = "Ethernet Switch";
                neList.icon = "../../Content/Images/satellite-dish-24-blue.png";
                var pt = currVal[v].GeodataValue;
                neList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')))
                neList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')))
                neArr.push(neList);
                this.points = neArr;
            }
        }
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
                        role: "",
                        target: " "
                    };

                    neList.label = value[v].NetworkElementName;
                    neList.value = value[v].NetworkElementType;
                    neList.role = value[v].Role;
                    neList.target = value[v].Target;
                    neArr.push(neList);
                }
                this.neNameData = neArr;
            },
            err => {
                this.mapInvalid = true;
                this.errorMsg = 'Something went wrong . please try again later !';
            }
        );
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
                        structList.icon = "../../Content/Images/shower-circular-holes-for-water.png";
                    }
                    else if (structList.type == "Site Location") {
                        structList.icon = "../../Content/Images/world-web_24-1.png";
                    }
                    else if (structList.type == "Fiber Cable") {
                        structList.icon = "../../Content/Images/fiber_cable_24.png";
                    }
                    else if (structList.type == "Pole") {
                        structList.icon = "../../Content/Images/pole_24.png";
                    }
                    else if (structList.type == "Handhole") {
                        structList.icon = "../../Content/Images/handhold_24.png";
                    }
                    else if (structList.type == "Junction Box") {
                        structList.icon = "../../Content/Images/junction-box-24x24.png";
                    }
                    else if (structList.type == "Customer Site Location") {
                        structList.icon = "../../Content/Images/home_24.png";
                    }
                    var pt = value[v].Geodata;
                    structList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                    structList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                    this.structs.push(structList);
                }
            },
            err => {
                this.mapInvalid = true;
                this.errorMsg = 'Something went wrong . please try again later !';
            });
    }

    onBuildingSelected(item: any, BuildingId: any) {
        this._logSingle("- selected (value: " + item.value + ", label:" + item.label + ",id:" + item.id + ")");
        this._data = this.form.value["selectSingle"];
        this.buildings = [];
        this.buildLRD = [];
        this.points = [];
       
        for (let b in this.buildingNames) {
            var currBuilding = this.buildingNames[b];
            for (let s in this._data) {
                var currSelBuilding = this._data[s];
                if (this._data[s] == currBuilding.value) {
                    this.buildings.push(currBuilding);
                }
            }
        }
        var buildId = '';
        var newBuilding = [];
        var buildingList = {
            label: "",
            value: "",
            lrd: "",
            id: "",
            type: "",
            lng: 0,
            lat: 0,
            icon: "../../Content/Images/flats-24-blue.png",
            points: []
        };

        if (item.label == "Select All") {
            var buildval = this.buildingNames;

            for (var v = 1; v <= buildval.length - 1; v++) {
               
                buildingList.label = buildval[v].label;
                buildingList.value = buildval[v].value;
                buildingList.lrd = buildval[v].lrd;
                buildingList.type = "Building";
                buildingList.id = buildval[v].id;
                buildingList.icon = "../../Content/Images/flats-24-blue.png";
                var pt = buildval[v].value;
                buildingList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                buildingList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                buildId = buildId + ("," + buildingList.id);
                this.buildings.push(buildingList);

            }
        }
        else {
            for (let v in this.buildings) {
             
                buildingList.label = this.buildings[v].label;
                buildingList.value = this.buildings[v].value;
                buildingList.lrd = this.buildings[v].lrd;
                buildingList.type = "Building";
                buildingList.id = this.buildings[v].id;
                buildingList.icon = "../../Content/Images/flats-24-blue.png";
                var pt = this._data[v];
                buildingList.lng = parseFloat(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                buildingList.lat = parseFloat(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                buildId = buildId + ("," + buildingList.id);
                this.buildings.push(buildingList);
            }
        }
        this._mapService.getLRD(buildId)
            .subscribe((value) => {
                this.lrdLoad = "Select LRD";
                var neArr = [];
                var SelectAll = {
                    label: 'Select All',
                    value: 'Select All'

                };
                neArr.push(SelectAll);

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
                    neList.lng = parseInt(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                    neList.lat = parseInt(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                    neArr.push(neList);
                }
                this.markerTypes = neArr;
            });
    }

    onBuildconnectivity(item: any) {
        var cableArr = [];
        var LRD = this.form.value["selectMultiple"];
        var newBuilding = [];
        var LRDval = this.markerTypes;
        this.buildLRD = [];
        var cableList = {
            CableId: "",
            label: "",
            type: "Aerial",
            color: "Navy",
            icon: "../../Content/Images/placeholder-24-black.png",
            points: []
        };

        if (LRD[0] === "Select All") {
            for (var v = 1; v <= this.markerTypes.length - 1; v++) {
                if (LRDval[v].label == item.lrd) {
                    cableList.CableId = item.value;
                    cableList.label = item.label;
                    cableList.type = "Building";
                    cableList.icon = "../../Content/Images/flats-24-blue.png";
                    var currGeoData = item.value.replace("POINT (", "").replace(")", "").split(", ");
                    var gArr = [];
                    var gData = { lng: 0, lat: 0, label: "" };
                    gData.lng = parseFloat(currGeoData[0].split(" ")[0]);
                    gData.lat = parseFloat(currGeoData[0].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                    gData = { lng: 0, lat: 0, label: "" };
                    var currLRd = LRDval[v].value.GeodataValue.replace("POINT (", "").replace(")", "").split(", ");
                    gData.lng = parseFloat(currLRd[0].split(" ")[0]);
                    gData.lat = parseFloat(currLRd[0].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                    cableList.points = gArr;
                    newBuilding.push(cableList);
                }
            }
        }

        else {
            for (let v in LRD) {
                if (LRD[v].LrdName == item.lrd) {
                    cableList.CableId = item.value;
                    cableList.label = item.label;
                    cableList.type = "Building";
                    cableList.icon = "../../Content/Images/flats-24-blue.png";
                    var currGeoData = item.value.replace("POINT (", "").replace(")", "").split(", ");
                    var gArr = [];
                    var gData = { lng: 0, lat: 0, label: "" };
                    gData.lng = parseFloat(currGeoData[0].split(" ")[0]);
                    gData.lat = parseFloat(currGeoData[0].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                    gData = { lng: 0, lat: 0, label: "" };
                    var currLRd = LRD[v].GeodataValue.replace("POINT (", "").replace(")", "").split(", ");
                    gData.lng = parseFloat(currLRd[0].split(" ")[0]);
                    gData.lat = parseFloat(currLRd[0].split(" ")[1]);
                    gData.label = cableList.label + gData.lng + "_" + gData.lat;
                    gArr.push(gData);
                    cableList.points = gArr;
                    newBuilding.push(cableList);
                }
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

    onDistanceSelected(item: any) {
        this.zoom = 10;
        this._logSingle("- selected (value: " + item.value + ", label:" +
            item.label + ")");
        var build = this;
        setTimeout(function () {
            build.buildingLoad = "Loading.....";
           }
            , 1000);
        this._mapService.getBuilding(item)
            .subscribe((value) => {
                    this.buildingLoad = "Select Building";
                var neArr = [];
                var SelectAll = {
                    label: 'Select All',
                    value: '',
                    lrd: '',
                    id: ''
                }

                neArr.push(SelectAll);
                for (let v in value) {
                    var neList = {
                        label: "",
                        value: "",
                        lrd: "",
                        id: ''
                    };
                    neList.label = value[v].BuildingName;
                    neList.value = value[v].Geodata;
                    neList.lrd = value[v].Lrd;
                    neList.id = value[v].BuildingId;
                    neArr.push(neList);
                }
                this.buildingNames = neArr;
            },
            err => {
                this.mapInvalid = true;
                this.errorMsg = 'Something went wrong . please try again later !';
            });

        this._mapService.getCable(item)
            .subscribe((value) => {
                    this.cableLoad = "Select Cable";
                var cableArr = [];
                var SelectAll = {
                    label: 'Select All',
                    value: 'Select All'
                }
                cableArr.push(SelectAll);

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
            },
            err => {
                this.mapInvalid = true;
                this.errorMsg = 'Something went wrong . please try again later !';
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