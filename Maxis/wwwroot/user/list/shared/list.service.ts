import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Userlist } from './list.interface';

@Injectable()
export class ListService {

    constructor(private _http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handelError(error: any) {
        console.error('post error:', error);
        return Observable.throw(error.statusText);
    }
    
    getUserlist(): Observable<Userlist[]> {
        return this._http.get('User/UsersList')
            .map((response: Response) => <Userlist[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handelError);
    }

    getPdf(): Observable<Userlist[]> {
        return this._http.get('USER/UsersList')
            .map((response: Response) => <Userlist[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handelError);
    }

    getExl(): Observable<Userlist[]> {
        return this._http.get('USER/UsersList')
            .map((response: Response) => <Userlist[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handelError);
    }
   

}

