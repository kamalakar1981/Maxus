import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Routes } from '@angular/router';
//import { ErrorComponent } from './../directives/error.component';

@Injectable()
export class ErrorService {
   // public _errorComponent: ErrorComponent
    constructor(public _router: Router,
       ) { }

    public handelError = (error: any) => {
        console.error('post error:', error);
        if (error.status == 403) {
            sessionStorage.removeItem('currentUser');
            sessionStorage.removeItem('userrole');
            this._router.navigate(['login']);

        }
        else {
           // this._errorComponent.errormessage(error.statusText);
            return Observable.throw(error.statusText);
          
        }
        //let errMsg: string;
        //if (error instanceof Response) {
        //   const body = error.json() || '';
        //    const err = body.error || JSON.stringify(body);
        //    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        //} else {
        //    errMsg = error.message ? error.message : error.toString();
        //}
        //console.error(errMsg);
        //return Observable.throw(errMsg);
    }
}

