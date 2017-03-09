import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { NgForm } from '@angular/forms';
import { User } from './shared/login.interface';

@Component({
    selector: 'login',
    templateUrl: 'wwwroot/login/login.component.html',
    styleUrls: ['wwwroot/login/login.component.css']
})

export class LoginComponent {

    user = new User('', '');

    constructor(private autenticationService: AuthenticationService) {

    }

    submitForm(form: NgForm) {
        this.autenticationService.postForm(this.user)
            .subscribe(
            data => console.log('success:', data),
            err => console.log('error:', err)
            )

    }

}