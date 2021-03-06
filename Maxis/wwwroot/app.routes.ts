﻿import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { contactRoutes } from './contact/contact.routes';
import { aboutRoutes } from './about/about.routes';
import { homeRoutes } from './home/home.routes';
import { loginRoutes } from './login/login.routes';
import { mapRoutes } from './map/map.routes';
import { editRoutes } from './user/edit/edit.routes';
import { listRoutes } from './user/list/list.routes';
import { logoutRoutes } from './logout/logout.routes';

// Route Configuration
export const routes: Routes = [
    //default
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },

    // Add routes form a different file
    ...contactRoutes,
    ...aboutRoutes,
    ...homeRoutes,
    ...loginRoutes,
    ...mapRoutes,
    ...editRoutes,
    ...listRoutes,
    ...logoutRoutes
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });