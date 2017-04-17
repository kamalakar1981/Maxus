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
    private sourcedataMck;
    private threshholdMck;
    private testdataval;
    serverData: any[];

    public html: string = `
<table  class="table table-bordered">
    <thead>
        <tr>
            <th>Available</th>
            <th>Oldval</th>
            <th>Name</th>
             <th>Total</th>

            <th>Used</th>
  <th>Value</th>
        </tr>
    </thead>
    <tbody *ngFor="let user of testdataval">
 <td>{{ testdataval }}</td>
            <td>{{ user.Total }}</td>
           
           
</tbody>



  </table>

`;

    constructor(private mapService: MapService) {
        console.log(this.sourcedata);
        this.sourcedataMck = this.sourcedata;
        this.threshholdMck = this.thresh;
    }

    ngOnInit() {
    }

    updateModel() {
        this.sourcedataMck = this.sourcedata;
        console.log(JSON.stringify(this.sourcedataMck));
    }
    updatethresh(capacity) {
        console.log(capacity);
        this.threshholdMck = this.thresh;
        this.mapService.getThreshold(capacity)
            .subscribe((NEName) => {
                this.testdataval = NEName;

            });
        console.log(JSON.stringify(this.threshholdMck));
    }

}