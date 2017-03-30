///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
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
import { LoginGuard } from './login/shared/login.guard';
import { AuthenticationService } from './login/shared/authentication.service';
import { LogoutComponent } from './logout/logout.component';
import { LogoutService } from './logout/shared/logout.service';
import { MapComponent } from './map/map.component';
import { Router } from '@angular/router';
import { DataTableModule, SharedModule } from 'primeng/primeng';

@NgModule({
    imports: [BrowserModule,
        HttpModule,
        FormsModule,
        routing,
        DataTableModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        MapComponent,
        EditComponent,
        ListComponent
    ],
    bootstrap: [AppComponent],
    providers: [HomeService, AuthenticationService, LoginGuard, EditService, ListService, LogoutService]
})
export class AppModule { }