///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'angular2-select';
//import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/shared/home.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/shared/authentication.service';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from 'angular2-google-maps/core';



@NgModule({
    imports: [BrowserModule,
        routing,
        HttpModule,
        SelectModule,
        FormsModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({ apiKey: "AIzaSyBKcHWQkH8hS_Hn1vBGMAVUXRApKB17Xu8", libraries: ["places"] })

    ],
    declarations: [AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        MapComponent
    ],
    bootstrap: [AppComponent],
    providers: [HomeService, AuthenticationService]
})
export class AppModule { }