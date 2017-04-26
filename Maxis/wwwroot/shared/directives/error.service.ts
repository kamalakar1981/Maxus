import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Router } from '@angular/router';

@Injectable()
export class ErrorService {

    constructor(private _router: Router) { }

    public handelError(error: any) {
        console.error('post error:', error);
        if (error.status == 403) {
            localStorage.removeItem('currentUser');
            this._router.navigate(['/login']);
        } 
        return Observable.throw(error.statusText);
    }

}

