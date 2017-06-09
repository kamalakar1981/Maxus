import { Component, NgModule, OnInit, ViewChild, NgZone, ElementRef } from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { } from '@types/googlemaps';
import { IMarker, ICable } from './shared/map.interface';
import { MapService } from './shared/map.service';
import { Router } from '@angular/router';

@Component({
    selector: 'map',
    templateUrl: 'wwwroot/map/map.component.html',
    styleUrls: ['wwwroot/map/map.component.css']
})

export class MapComponent implements OnInit {
    errorMsg: string;
    message: string = 'Something went wrong . please try again later !';
    mapInvalid: Boolean = false;
    user: string = sessionStorage.getItem('currentUser');
    role: string = sessionStorage.getItem('userrole');
    year: Number = new Date().getFullYear();
    neNameData: any;
    buildingData: any;
    selectedMap: any;
    selectMultiple1: any;
    selectSingle1: any;
    buildingLoad: string;
    distanceLoad: string;
    lrdLoad: string;
    cableLoad: string;
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
    zoom: number;
    cabelTypes: any[];
    form: FormGroup;
    logSingleString: string = "";
    logMultipleString: string = "";
    load: string = "Loading....";
    lat: number;
    lng: number;
    manholeIcon: string = "../../Content/Images/shower-circular-holes-for-water.png";
    poleIcon: string = "../../Content/Images/pole_24.png";
    handholeIcon: string = "../../Content/Images/handhold_24.png";
    siteloctionIcon: string = "../../Content/Images/world-web_24-1.png";
    customerlocationIcon: string = "../../Content/Images/home_24.png";
    fiberIcon: string = "../../Content/Images/fiber_cable_24.png";
    junctionIcon: string = "../../Content/Images/junction-box-24x24.png";
    lrdIcon: string = "../../Content/Images/satellite-dish-24-blue.png";
    buildingIcon: string = "../../Content/Images/flats-24-blue.png";
    styles: any[] = [

        {
            featureType: "poi",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    constructor(
        private _mapsAPILoader: MapsAPILoader,
        private _ngZone: NgZone,
        private _router: Router,
        private _mapService: MapService
    ) { }

    @ViewChild("search")
    searchElementRef: ElementRef;

    ngOnInit() {
        this.buildingLoad = this.load;
        this.distanceLoad = this.load;
        this.lrdLoad = this.load;
        this.cableLoad = this.load;
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
        // load Places Autocompletes
        this._mapsAPILoader.load().then(() => {
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
                    this.dist = [];
                    this.buildingNames = [];
                    this.markerTypes = [];
                    this.cableTypes = [];
                    this._mapService.getload(point).subscribe(
                        data => {
                            var allDistance = [];
                            var distval: number = 0;
                            for (let i = data.Range; i <= 100; i = i + 10) {
                                allDistance[distval] = i;
                                distval++;
                            }
                            this.getDistance(allDistance);
                        },
                        err => {
                            this.mapInvalid = true;
                            this.errorMsg = this.message;
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

    getDistance(distval): void {
        this.dist = [];
        var distValue = [];
        distval.map(function (val) {
            distValue.push({ value: val.toString(), label: val.toString() });
        });
        this.dist = distValue;
        var distance = this;
        setTimeout(function () {
                distance.form.controls['selectedDistance'].setValue(distValue[0].value);
            }
            , 1000);
        this.onDistanceSelected(distValue[0]);
        this.distanceLoad = "Select Distance";
    };

    getCables(cableID): ICable[] {
        this.zoom = 10;
        var cableVal = this.cableTypes;
        var cableArr = [];
        this.structs = [];
        this.cables = [];
        for (let v in cableVal) {
            if (cableID[0] === "Select All" || (cableID === cableVal[v].value || cableID.indexOf(cableVal[v].value) > -1)) {
                var cableList = {
                    label: cableVal[v].label,
                    type: "Aerial",
                    color: "skyblue",
                    CableId: cableVal[v].value,
                    icon: " ",
                    points: []
                };
                if (!cableVal[v].Geodata)
                    cableVal[v].Geodata = '';
                var currGeoData = cableVal[v].Geodata.replace("LINESTRING (", "").replace(")", "").split(", ");
                var geoArr = [];
                for (let v in currGeoData) {
                    var geoValue = { lng: 0, lat: 0, label: "", lab: "" };
                    geoValue.lng = parseFloat(currGeoData[v].split(" ")[0]);
                    geoValue.lat = parseFloat(currGeoData[v].split(" ")[1]);
                    geoValue.label = cableList.label + geoValue.lng + "_" + geoValue.lat;
                    geoValue.lab = cableList.label;
                    geoArr.push(geoValue);
                }
                cableList.points = geoArr;
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
        var currVal = this.form.value["selectMultiple"];
        if (currVal[0] === "Select All") {
            var lrdval = this.markerTypes;
            for (var v = 1; v <= lrdval.length - 1; v++) {
                var lrdPoints = lrdval[v].value.GeodataValue;
                var lng = parseFloat(lrdPoints.substring(lrdPoints.indexOf('(') + 1, lrdPoints.lastIndexOf(' ')));
                var lat = parseFloat(lrdPoints.substring(lrdPoints.lastIndexOf(' ') + 1, lrdPoints.lastIndexOf(')')));
                var neList = {
                    label: lrdval[v].label,
                    value: lrdval[v].label,
                    type: "Ethernet Switch",
                    lng: lng,
                    lat: lat,
                    icon: this.lrdIcon
                };
                neArr.push(neList);
                this.points = neArr;
            }
        }
        else {
            for (let v in currVal) {
                var lrdPoints = currVal[v].GeodataValue;
                var lng = parseFloat(lrdPoints.substring(lrdPoints.indexOf('(') + 1, lrdPoints.lastIndexOf(' ')));
                var lat = parseFloat(lrdPoints.substring(lrdPoints.lastIndexOf(' ') + 1, lrdPoints.lastIndexOf(')')));
                var neList = {
                    label: currVal[v].LrdName,
                    value: currVal[v].LrdName,
                    type: "Ethernet Switch",
                    lng: lng,
                    lat: lat,
                    icon: this.lrdIcon
                };
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
                            label: value[v].NetworkElementName,
                            value: value[v].NetworkElementType,
                            role: value[v].Role,
                            target: value[v].Target
                        };
                        neArr.push(neList);
                    }
                    this.neNameData = neArr;
                },
                err => {
                    this.mapInvalid = true;
                    this.errorMsg = this.message;
                }
            );
    }

    onStructSelected(item: any, cableIdValue: any) {
        var obj = {
            CableId: "0",
            range: 0,
            searchpoint: "POINT (0,0)"
        };
        obj.range = parseInt(this.form.value["selectedDistance"]);
        obj.searchpoint = "POINT (" + item.lng + " " + item.lat + ")";
        obj.CableId = cableIdValue;
        this.structs = [];
        this._mapService.getStruct(obj)
            .subscribe((value: any) => {
                    for (var v in value) {
                        var structPoint = value[v].Geodata;
                        var lng = parseFloat(structPoint.substring(structPoint.indexOf('(') + 1, structPoint.lastIndexOf(' ')));
                        var lat = parseFloat(structPoint.substring(structPoint.lastIndexOf(' ') + 1, structPoint.lastIndexOf(')')));
                        var structList = {
                            label: value[v].StructureName,
                            value: value[v].StructureId,
                            type: value[v].StructureOtName,
                            lng: lng,
                            lat: lat,
                            icon: ""
                        };
                        if (structList.type === "Manhole") {
                            structList.icon = this.manholeIcon;
                        }
                        else if (structList.type === "Site Location") {
                            structList.icon = this.siteloctionIcon;
                        }
                        else if (structList.type === "Fiber Cable") {
                            structList.icon = this.fiberIcon;
                        }
                        else if (structList.type === "Pole") {
                            structList.icon = this.poleIcon;
                        }
                        else if (structList.type === "Handhole") {
                            structList.icon = this.handholeIcon;
                        }
                        else if (structList.type === "Junction Box") {
                            structList.icon = this.junctionIcon;
                        }
                        else if (structList.type === "Customer Site Location") {
                            structList.icon = this.customerlocationIcon;
                        }
                        this.structs.push(structList);
                    }
                },
                err => {
                    this.mapInvalid = true;
                    this.errorMsg = this.message;
                });
    }

    onBuildingSelected(item: any, BuildingId: any) {
        this._logSingle("- selected (value: " + item.value + ", label:" + item.label + ",id:" + item.id + ")");
        this.zoom = 8;
        this.buildingData = this.form.value["selectSingle"];
        this.buildings = [];
        this.buildLRD = [];
        this.points = [];
        for (let b in this.buildingNames) {
            var currBuilding = this.buildingNames[b];
            for (let s in this.buildingData) {
                var currSelBuilding = this.buildingData[s];
                if (this.buildingData[s] === currBuilding.value) {
                    this.buildings.push(currBuilding);
                }
            }
        }
        var buildId = '';
        var newBuilding = [];
        if (item.label === "Select All") {
            var buildval = this.buildingNames;
            for (var v = 1; v <= buildval.length - 1; v++) {
                var buildingPoint = buildval[v].value;
                var lng = parseFloat(buildingPoint.substring(buildingPoint.indexOf('(') + 1, buildingPoint.lastIndexOf(' ')));
                var lat = parseFloat(buildingPoint.substring(buildingPoint.lastIndexOf(' ') + 1, buildingPoint.lastIndexOf(')')));
                var buildingList = {
                    label: buildval[v].label,
                    value: buildval[v].value,
                    lrd: buildval[v].lrd,
                    id: buildval[v].id,
                    type: "Building",
                    lng: lng,
                    lat: lat,
                    icon: this.buildingIcon,
                    points: []
                };
                buildId = buildId + ("," + buildingList.id);
                this.buildings.push(buildingList);
            }
        }
        else {
            for (let v in this.buildings) {
                var buildingPoint = this.buildingData[v];
                var lng = parseFloat(buildingPoint.substring(buildingPoint.indexOf('(') + 1, buildingPoint.lastIndexOf(' ')));
                var lat = parseFloat(buildingPoint.substring(buildingPoint.lastIndexOf(' ') + 1, buildingPoint.lastIndexOf(')')));
                var buildingList = {
                    label: this.buildings[v].label,
                    value: this.buildings[v].value,
                    lrd: this.buildings[v].lrd,
                    id: this.buildings[v].id,
                    type: "Building",
                    lng: lng,
                    lat: lat,
                    icon: this.buildingIcon,
                    points: []
                };
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
                for (let v in value) {
                    var pt = value[v].GeodataValue;
                    var lng = parseInt(pt.substring(pt.indexOf('(') + 1, pt.lastIndexOf(' ')));
                    var lat = parseInt(pt.substring(pt.lastIndexOf(' ') + 1, pt.lastIndexOf(')')));
                    var neList = {
                        label: value[v].LrdName,
                        value: value[v],
                        type: "Ethernet Switch",
                        lng: lng,
                        lat: lat,
                        icon: this.lrdIcon
                    };
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
            type: "Building",
            color: "Navy",
            icon: this.buildingIcon,
            points: []
        };
        if (LRD[0] === "Select All") {
            for (var v = 1; v <= this.markerTypes.length - 1; v++) {
                if (LRDval[v].label === item.lrd) {
                    cableList.CableId = item.value;
                    cableList.label = item.label;
                    cableList.type = cableList.type;
                    cableList.icon = cableList.icon;
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
                if (LRD[v].LrdName === item.lrd) {
                    cableList.CableId = item.value;
                    cableList.label = item.label;
                    cableList.type = cableList.type;
                    cableList.icon = cableList.icon;
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

    onDistanceSelected(item: any) {
        this.zoom = 10;
        this._logSingle("- selected (value: " + item.value + ", label:" + item.label + ")");
        var build = this;

        setTimeout(function () {
                build.buildingLoad = "Loading.....";
            }
            , 1000);
        this.buildingNames = [];
        this.markerTypes = [];
        this.cableTypes = [];
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
                            label: value[v].BuildingName,
                            value: value[v].Geodata,
                            lrd: value[v].Lrd,
                            id: value[v].BuildingId
                        };
                        neArr.push(neList);
                    }
                    this.buildingNames = neArr;
                },
                err => {
                    this.mapInvalid = true;
                    this.errorMsg = this.message;
                });

        this._mapService.getCable(item)
            .subscribe((value) => {
                    this.cableLoad = "Select Cable";
                    var cableArr = [];
                    var SelectAll = {
                        label: 'Select All',
                        value: 'Select All',
                        Geodata: ""
                    }
                    cableArr.push(SelectAll);
                    for (let v in value) {
                        var cableList = {
                            label: value[v].CableName,
                            value: value[v].CableId,
                            Geodata: value[v].Geodata
                        };
                        cableArr.push(cableList);
                    }
                    this.cableTypes = cableArr;
                },
                err => {
                    this.mapInvalid = true;
                    this.errorMsg = this.message;
                });
    }

    onCableSelected(item: any) {
        this.markers = this.getCables(this.form.value["selectSingle1"]);
        var p = this.markers.filter(p => p.label === this.form.value["selectSingle1"])[0];
        this._logMultiple("- selected (value: " + item.value + ", label:" + item.label + ")");
    }

    private _logSingle(msg: string) {
        this.logSingleString += msg + "\n";
    }

    private _logMultiple(msg: string) {
        this.logMultipleString += msg + "\n";
    }
}