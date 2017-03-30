import { Routes } from '@angular/router';
import { LoginGuard } from './../../login/shared/login.guard';
import { ListComponent } from './list.component';

// Route Configuration
export const listRoutes: Routes = [
    { path: 'list', component: ListComponent, canActivate: [LoginGuard] }
];