import { Component, OnInit } from '@angular/core';
import { AuthenticationService,User } from './shared/authentication.service';


@Component({
    selector: 'login',
    templateUrl: 'wwwroot/login/login.component.html',
    styleUrls: ['wwwroot/login/login.component.css']
})

export class LoginComponent {
    public user = new User('', '');
    errorMsg: string;

    constructor( private _service: AuthenticationService) { }

    login() {
        if (!this._service.login(this.user)) {
            this.errorMsg = 'UserName and password doesnt exist in LDAP';
            return false;
        } else {

        }

    }
}