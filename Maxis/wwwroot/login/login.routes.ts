import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginGuard } from './shared/login.guard';
// Route Configuration
export const loginRoutes: Routes = [
    { path: 'login', component: LoginComponent}
]; 