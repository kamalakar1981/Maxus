import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MapComponent } from './../../map/map.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Map } from './map.interface';

@Injectable()
export class MapService {

    public values: any;

    constructor(public _http: Http) { }

    private MapLRDUrl = 'Map/LRD'; // URL to web api
    private MapNEtypesUrl = 'Map/NEtypes'; // URL to web api
    private MapNEUrl = 'Map/CableTypes';
    private point;
    private range;
    //getMarker() {
    //    return this._http.get(this.MapUrl)
    //        .map(res => <Map[]>res.json())
    //        .catch(this.handleError);
    //}

    //       Fetch all existing comments
    getMarker(): Observable<any[]> {
        // ...using get request 
        return this._http.get(this.MapLRDUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    getCableTypes(): Observable<any[]> {
        // ...using get request 
        return this._http.get(this.MapNEUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    load(point: any): Observable<any> {
        this.point = point;
        let body = JSON.stringify(point);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.MapLRDUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    postLRD(value: any): Observable<any> {
        let point = this.point;
        this.range = value.value;
        point = "POINT (101.623333055556 3.05305611111111)";
        let body = JSON.stringify({ SearchPoint: point, Range: this.range });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.MapLRDUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    postNEtypes(value: any): Observable<any> {
        let point = this.point;
        point = "POINT (101.623333055556 3.05305611111111)";
        let body = JSON.stringify({ SearchPoint: point, Range: this.range, LRD: value[0] });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.MapNEtypesUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDistance(value: any): Observable<any> {
        let body = JSON.stringify(value);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.MapLRDUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getLRD(value: any): Observable<any> {
        let body = JSON.stringify(value);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.MapLRDUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}


