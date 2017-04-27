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

    errorMsg: string ;
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
                if (data.ErrorStatus === null || data.ErrorStatus === '' || data.ErrorStatus === undefined)
                {
                    this._router.navigate(['map']);
                }
                else {
                    this.loginInvalid = true;
                    this.errorMsg = data.ErrorStatus;
                }
                
            },
            err => {
                this.loginInvalid = true;
                this.errorMsg = 'Something went wrong . please try again later !';
            });

    }

}