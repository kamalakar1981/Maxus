///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { DataTableModule, SharedModule, PaginatorModule } from 'primeng/primeng';
import { NEComponent } from './NEtype/ne.component';
import { SelectModule } from 'angular2-select';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { DropdownModule } from "ngx-dropdown";
import { MapService } from './map/shared/map.service';
import { UiSwitchModule } from 'angular2-ui-switch';
import { ErrorService } from './shared/directives/error.service';


@NgModule({
    imports: [BrowserModule,
        HttpModule,
        PaginatorModule,
        SelectModule,
        FormsModule,
        routing,
        DataTableModule,
        SharedModule,
        AgmCoreModule.forRoot({ apiKey: "AIzaSyBKcHWQkH8hS_Hn1vBGMAVUXRApKB17Xu8", libraries: ["places"] }),
        DropdownModule,
        UiSwitchModule,
        ReactiveFormsModule,
    ],
    declarations: [AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        MapComponent,
        EditComponent,
        NEComponent,
        ListComponent,
    ],
    bootstrap: [AppComponent],
    providers: [HomeService, AuthenticationService, LoginGuard, EditService, ListService, LogoutService, MapService, ErrorService]
})
export class AppModule { } 