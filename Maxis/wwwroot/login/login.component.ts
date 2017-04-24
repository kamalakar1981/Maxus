import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { NgForm } from '@angular/forms';
import { IUser } from './shared/login.interface';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
    selector: 'login',
    templateUrl: 'wwwroot/login/login.component.html',
    styleUrls: ['wwwroot/login/login.component.css']
})

export class LoginComponent {
    errorMsg: string = "Username and password does not exist in LDAP";
    user: any = {};
    loginInvalid = false;
    constructor(private _autenticationService: AuthenticationService,
        private _router: Router,
        private _route: ActivatedRoute) {
    }

    submitForm(form: NgForm) {
        this._autenticationService.postForm(this.user.username, this.user.password)
            .subscribe(
            data => {
                this._router.navigate(['map']);
            },
            err => {
                this.loginInvalid = true;
            });

    }

}