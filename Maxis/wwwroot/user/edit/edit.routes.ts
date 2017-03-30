import { Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { LoginGuard } from './../../login/shared/login.guard';
// Route Configuration
export const editRoutes: Routes = [
    { path: 'edit', component: EditComponent, canActivate: [LoginGuard] }
]; 