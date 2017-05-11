import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { LoginGuard } from './../../login/shared/login.guard';
import { ListComponent } from './../list/list.component';
// Route Configuration
export const editRoutes: Routes = [
    { path: 'edit', component: EditComponent, canActivate: [LoginGuard] },
    { path: 'edit/:userId', component: EditComponent, canActivate: [LoginGuard] },
]; 