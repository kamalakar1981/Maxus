import { Routes } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { LoginGuard } from './../login/shared/login.guard';
// Route Configuration
export const logoutRoutes: Routes = [
    { path: 'logout', component: LogoutComponent, canActivate: [LoginGuard] }
]; 