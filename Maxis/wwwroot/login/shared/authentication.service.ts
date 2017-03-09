import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginComponent } from './../../login/login.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { User } from './login.interface';


@Injectable()
export class AuthenticationService {

    constructor(
        private http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body.user || {};
    }

    private handelError(error: any) {
        console.error('post error:', error);
        return Observable.throw(error.statusText);
    }

    postForm(user: User): Observable<any> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:56026/Login/Details', body, options)
            .map(this.extractData)
            .catch(this.handelError);
    }
}

