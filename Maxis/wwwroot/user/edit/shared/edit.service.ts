﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Userlist } from './../../list/shared/list.interface';
import { ErrorService } from './../../../shared/directives/error.service';

@Injectable()
export class EditService {
    private baseUrl = 'User/Edit';
    private url = 'User/UpdateUser';

    constructor(private _http: Http,
                private _errorService: ErrorService) { }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    getEditList(UserId: number): Observable<Userlist> {
        const url = `${this.baseUrl}/${UserId}`;
        return this._http.get(url)
            .map(this.extractData)
            .do(data => console.log('getEditList: ' + data))
            .catch(this._errorService.handelError);
    }

    saveProduct(ulist: Userlist): Observable<Userlist> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.updateList(ulist, options);
    }

    private updateList(ulist: Userlist, options: RequestOptions): Observable<Userlist> {
        const url = `${this.url}`;
        return this._http.post(url, ulist, options)
            .map(() => ulist)
            .do(data => console.log('updateList: ' + data))
            .catch(this._errorService.handelError);
    }
}

