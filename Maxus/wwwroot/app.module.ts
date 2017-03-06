///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AboutComponent }    from './about/about.component';
import { ContactComponent }    from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/shared/home.service';
@NgModule({
    imports: [BrowserModule,
        routing,
        HttpModule
    ],
    declarations: [AppComponent,
        AboutComponent,
        ContactComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    providers: [HomeService]
})
export class AppModule { }