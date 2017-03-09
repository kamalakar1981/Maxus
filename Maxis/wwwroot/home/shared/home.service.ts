
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HomeService {

    constructor(private http: Http) {
    }
    // This is where your methods and properties go, for example: 
    private heroesUrl = '/home/GetUser';  // URL to web API
    sayHeyMethod() {
        return 'Hey!';
    }

    //       Fetch all existing comments
    getServerData(): Observable<any[]> {
        // ...using get request
        return this.http.get(this.heroesUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
}