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
`;

    ngOnInit() {
}
}