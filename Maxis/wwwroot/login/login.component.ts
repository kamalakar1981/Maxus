import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { NgForm } from '@angular/forms';
import { User } from './shared/login.interface';
import { Router } from '@angular/router';
@Component({
    selector: 'login',
    templateUrl: 'wwwroot/login/login.component.html',
    styleUrls: ['wwwroot/login/login.component.css']
})

export class LoginComponent {

    user = new User('', '');
    loginInvalid = false;
    constructor(private _autenticationService: AuthenticationService, private router: Router) {

    }

    submitForm(form: NgForm) {
        this._autenticationService.postForm(this.user)
            .subscribe(
            data => {
                if (!data) {
                    this.loginInvalid = true;
                }
                else {
                    this.router.navigate(['map']);
                    console.log('success:', data);
                }
            },
            err => console.log('error:', err)
            )

    }

}