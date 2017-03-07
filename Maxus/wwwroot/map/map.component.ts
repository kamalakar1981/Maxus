import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './..//login/shared/authentication.service';

@Component({
    selector: 'gmap',
    providers: [AuthenticationService],
    templateUrl: 'wwwroot/map/map.component.html',
})

export class MapComponent {

    constructor(
        private _service: AuthenticationService) { }

    ngOnInit() {
        this._service.checkCredentials();
    }

    logout() {
        this._service.logout();
    }
}