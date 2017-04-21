import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from './../map/map.component';
import { MapService } from './../map/shared/map.service';

@Component({
    selector: 'netypetable',
    templateUrl: 'wwwroot/NEtype/ne.component.html',
    styleUrls: ['wwwroot/NEtype/ne.component.css']

})

export class NEComponent implements OnInit {
    @Input() sourcedata: any;
    @Input() thresh: any;
    title: string;
    private _sourcedataMck;
    private _threshholdMck;
    private _threshdataval;
    serverData: any[];

    public html: string = `
    <table  class="table table-bordered">
    <thead>
        <tr>
            <th>Name</th>
             <th>Total</th>
            <th>Available</th>

            <th>Used</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody *ngFor="let user of threshdataval">
     <td>{{ threshdataval }}</td>
      <td>{{ user.Total }}</td>
           </tbody>
     </table>

`;

    constructor(private _mapService: MapService) {
        this._sourcedataMck = this.sourcedata;
        this._threshholdMck = this.thresh;
    }

    ngOnInit() {
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