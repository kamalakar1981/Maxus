import { Routes } from '@angular/router';
import { LoginGuard } from './../login/shared/login.guard';
import { MapComponent } from './map.component';
import { NEComponent } from './../NEtype/ne.component';
// Route Configuration
export const mapRoutes: Routes = [
    { path: 'map', component: MapComponent, canActivate: [LoginGuard] }
]; 