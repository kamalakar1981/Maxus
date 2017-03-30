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
        if (body && body.token) {
            // store user details and token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(body));
        }
        return body.data || {};
    }

    private handelError(error: any) {
        console.error('post error:', error);
        return Observable.throw(error.statusText);
    }

    postForm(username: string, password: string): Observable<any> {
        let body = JSON.stringify({ username: username, password: password });
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
     //   headers.append('Authorization', 'Basic ' + localStorage.getItem("authToken"));

        let options = new RequestOptions({ headers: headers });
        

        return this.http.post('Login/Details', body, options)
            .map(this.extractData)
            .catch(this.handelError);
    }
}

