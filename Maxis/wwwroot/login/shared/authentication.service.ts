import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginComponent } from './../../login/login.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { IUser } from './login.interface';
import { ErrorService } from './../../shared/directives/error.service';

@Injectable()
export class AuthenticationService {

    constructor(private _http: Http,
                private _errorService: ErrorService) { }

    private extractData(res: Response) {
        let body = res.json();
        if (body && body.Username) {
            // store user details and token in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', body.Username);
            sessionStorage.setItem('userrole', body.Roles);
        }
        return body || {};
    }

    private handelError(error: any) {
        console.error('post error:', error);
        return Observable.throw(error.statusText);
    }

    postForm(username: string, password: string): Observable<any> {
        let body = { username: username, password: password };
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this._http.post('Login/Login', body, options)
            .map(this.extractData)
            .catch(this._errorService.handelError);
    }
}

