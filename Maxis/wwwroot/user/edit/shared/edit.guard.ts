import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { EditComponent } from './../../edit/edit.component';

@Injectable()
export class UserDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid product Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/lists']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class UserEditGuard implements CanDeactivate<EditComponent> {

    canDeactivate(component: EditComponent): boolean {
        if (component.editform.dirty) {
            let userName = component.editform.get('userName').value || 'New Product';
            return confirm(`Navigate away and lose all changes to ${userName}?`);
        }
        return true;
    }
}
