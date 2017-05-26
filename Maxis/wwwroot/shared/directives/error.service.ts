import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Routes } from '@angular/router';

@Injectable()
export class ErrorService {

    constructor(public _router: Router) { }

    public handelError = (error: any) => {
        console.error('post error:', error);
        if (error.status == 403) {
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('userrole');
            this._router.navigate(['login']);

        }
        else {
            return Observable.throw(error.statusText);
        }
    }
}