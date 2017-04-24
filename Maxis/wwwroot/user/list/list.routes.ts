import { Routes } from '@angular/router';
import { LoginGuard } from './../../login/shared/login.guard';
import { ListComponent } from './list.component';
import { EditComponent } from './../edit/edit.component';
// Route Configuration
export const listRoutes: Routes = [
    { path: 'list', component: ListComponent, canActivate: [LoginGuard]  },
    { path: 'list/:userId', component: ListComponent },
];