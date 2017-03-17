///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/shared/home.service';
import { EditComponent } from './user/edit/edit.component';
import { EditService } from './user/edit/shared/edit.service';
import { ListComponent } from './user/list/list.component';
import { ListService } from './user/list/shared/list.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './login/shared/authentication.service';
import { MapComponent } from './map/map.component';
import { Router } from '@angular/router';


@NgModule({
    imports: [BrowserModule,
        routing,
        HttpModule,
        FormsModule,
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
    providers: [HomeService, AuthenticationService, EditService, ListService]
})
export class AppModule { }