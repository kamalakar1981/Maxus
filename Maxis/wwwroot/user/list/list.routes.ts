import { Routes } from '@angular/router';
import { LoginGuard } from './../../login/shared/login.guard';
import { ListComponent } from './list.component';
import { EditComponent } from './../edit/edit.component';
// Route Configuration
export const listRoutes: Routes = [
    { path: 'list', component: ListComponent, canActivate: [LoginGuard]  },
    { path: 'edit/:userId', component: EditComponent },
    { path: 'edit', component: EditComponent },
    { path: 'list/:userId', component: ListComponent },
//canActivate: [LoginGuard]  
];