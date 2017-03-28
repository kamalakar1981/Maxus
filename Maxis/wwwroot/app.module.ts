///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
//import { SelectModule } from 'angular2-select';
import { SelectModule } from 'angular2-select';

//import { ReactiveFormsModule } from '@angular/forms';
//import { DataTableModule, InputTextModule } from 'primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/shared/home.service';
import { ContactService } from './contact/shared/contact.service';

import { EditComponent } from './user/edit/edit.component';
import { EditService } from './user/edit/shared/edit.service';
import { ListComponent } from './user/list/list.component';
import { ListService } from './user/list/shared/list.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/shared/authentication.service';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { Router } from '@angular/router';


import { MapService } from './map/shared/map.service';


@NgModule({
    imports: [BrowserModule,
        routing,
        HttpModule,

        SelectModule,
        DataTableModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({ apiKey: "AIzaSyBKcHWQkH8hS_Hn1vBGMAVUXRApKB17Xu8", libraries: ["places"] })

    ],
    declarations: [AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        MapComponent,
        EditComponent,
        ListComponent
    ],
    bootstrap: [AppComponent],
    providers: [HomeService, AuthenticationService, EditService, ListService, MapService]
})
export class AppModule { }