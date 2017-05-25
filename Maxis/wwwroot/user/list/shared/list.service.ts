import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Userlist } from './list.interface';
import { ErrorService } from './../../../shared/directives/error.service';

@Injectable()
export class ListService {

    constructor(private _http: Http,
                private _errorService: ErrorService) { }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    getUserlist(): Observable<Userlist[]> {
        return this._http.get('User/UsersList')
            .map((response: Response) => <Userlist[]>response.json())
            .do(data => console.log('All: ' + data))
            .catch(this._errorService.handelError);
    }
}