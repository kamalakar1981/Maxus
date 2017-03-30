import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from './../map/map.component';
import { MapService } from './../map/shared/map.service';

@Component({
    selector: 'netypetable',
    templateUrl: 'wwwroot/NEtype/ne.component.html'
})

export class NEComponent implements OnInit {
    @Input() sourcedata: MapComponent;
    title: string;
    private sourcedataMck;
    serverData: any[];

    public html: string = `
<table  class="table table-bordered">
  <tr>
    <th>Threshhold name</th>
    <th>Total</th>
    <th>Avail</th>
<th>Used</th>
<th>Value</th>
  </tr>
<tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</table>

`;

    constructor() {
        console.log(this.sourcedata);
        this.sourcedataMck = [
            {
                "NEName": "GCKCA",
                "NEType": "one",
                "Roles": "one R"
            },
            {
                "NEName": "GGKPA",
                "NEType": "two",
                "Roles": "Two R"
            },
            {
                "NEName": "GSRWA",
                "NEType": "three",
                "Roles": "Three R"
            }
        ];
        console.log("Welcom");
    }

    ngOnInit() {
}
}