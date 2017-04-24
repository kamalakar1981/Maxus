import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let adminPage = ['list', 'edit'];
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            if (adminPage.indexOf(route.url[0].path.toString()) > -1 && localStorage.getItem('userrole') == "ADMIN") {
                return true;
            } else if (adminPage.indexOf(route.url[0].path.toString()) == -1) {
                return true;
            }
            return false;
        }
        // not logged in so redirect to login page with the return url
        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}