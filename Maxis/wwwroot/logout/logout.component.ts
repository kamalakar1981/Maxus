import { Component } from '@angular/core';
import { LogoutService } from './shared/logout.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'logout',
    templateUrl: 'wwwroot/logout/logout.component.html',
    styleUrls: ['wwwroot/logout/logout.component.css']
})

export class LogoutComponent {
    constructor(private _logoutService: LogoutService) { }

    logout() {
        this._logoutService.logout().subscribe(() => {
            localStorage.removeItem('currentUser');
        })
    }
}