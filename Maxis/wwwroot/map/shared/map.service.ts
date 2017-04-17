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
    private _mapNEtypesUrl = 'Map/NENames';
    private _mapLRDUrl = 'Map/LRD';
    private _mapBuildingUrl = 'Map/Buildings';
    private _mapNEUrl = 'Map/CableTypes';
    private _structUrl = 'Map/Structures';
    private _threshUrl = 'Map/Threshold'
    private _cables = 'Map/Cables';
    private _point;
    private _cableId;
    private _range;
    private _NEname;
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

        //  point = "POINT (101.743026080221 2.99700230112665)";
        this._range = value.value;
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range });
        return this._http.post(this._mapLRDUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getStruct(value: any): Observable<any> {
        //let point = this._point;

        // point = "POINT (101.743026080221 2.99700230112665)";
        // this._range = value.value;
        let body = JSON.stringify(value);
        return this._http.post(this._structUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCable(value: any): Observable<any> {

        // point = "POINT (101.743026080221 2.99700230112665)";
        this._range = value.value;
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range });
        return this._http.post(this._cables, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNEtypes(value: any): Observable<any> {

        //point = "POINT (101.743026080221 2.99700230112665)";
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range, LRD: value });
        return this._http.post(this._mapNEtypesUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getBuilding(value: any): Observable<any> {

        //point = "POINT (101.743026080221 2.99700230112665)";
        this._range = value.value;
        let body = JSON.stringify({ SearchPoint: this._point, Range: this._range });
        return this._http.post(this._mapBuildingUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getDistance(value: any): Observable<any> {
        let body = JSON.stringify(value);
        return this._http.post(this._mapLRDUrl, body, this._requestOption)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getThreshold(NEName: any): Observable<any> {
        this._NEname = NEName;
        let body = { NEName: this._NEname };
        return this._http.post(this._threshUrl, body, this._requestOption)
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
