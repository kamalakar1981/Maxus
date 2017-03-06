import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { contactRoutes } from './contact/contact.routes';
import { aboutRoutes }  from './about/about.routes';
import { homeRoutes } from './home/home.routes';

// Route Configuration
export const routes: Routes = [
    //default
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    // Add routes form a different file
    ...contactRoutes,
    ...aboutRoutes,
    ...homeRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);