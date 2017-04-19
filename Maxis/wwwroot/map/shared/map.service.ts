import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MapComponent } from './../../map/map.component';
import 'rxjs/Rx';
import { Observable } from 'rxjs/observable';
import { Map } from './map.interface';

@Injectable()
export class MapService {

    public values: any;

    constructor(private _http: Http) { }
    private _mapNEtypesUrl = 'Map/NEtypes';
    private _mapLRDUrl = 'Map/LRD';
    private _mapNEUrl = 'Map/CableTypes';
    private _point;
    private _range;
    private _requestOption = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });

    getMarker(): Observable<any[]> {
        return this._http.get(this._mapLRDUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCableTypes(): Observable<any[]> {
        return this._http.get(this._mapNEUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
    getload(point: any): Observable<any> {
        this._point = point;

        let body = JSON.stringify(point);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._mapLRDUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getLRD(value: any): Observable<any> {
        let point = this._point;
        this._range = value.value;
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range });
        return this._http.post(this._mapLRDUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNEtypes(value: any): Observable<any> {
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range, LRD: value[0] });
        return this._http.post(this._mapNEtypesUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBuilding(value: any): Observable<any> {
        this._range = value.value;
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range });
        return this._http.post(this._mapLRDUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDistance(value: any): Observable<any> {
        let body = JSON.stringify(value);
        return this._http.post(this._mapLRDUrl, body, this._requestOption)
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
