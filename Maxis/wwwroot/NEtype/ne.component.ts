import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from './../map/map.component';
import { MapService } from './../map/shared/map.service';

@Component({
    selector: 'netypetable',
    templateUrl: 'wwwroot/NEtype/ne.component.html',
    styleUrls: ['wwwroot/NEtype/ne.component.css']

})

export class NEComponent {
    @Input() sourcedata: any;
    @Input() thresh: any;
    title: string;
    private _sourcedataMck;
    private _threshholdMck;
    private _threshdataval;
    serverData: any[];


    constructor(private _mapService: MapService) {
        this._sourcedataMck = this.sourcedata;
        this._threshholdMck = this.thresh;
    }


    updateModel() {
        this._sourcedataMck = this.sourcedata;
    }
    updatethresh(capacity) {
        this._threshholdMck = this.thresh;
        this._mapService.getThreshold(capacity)
            .subscribe((NEName) => {
                this._threshdataval = NEName;
            });
    }

}