"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="./../typings/globals/core-js/index.d.ts"/>
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var about_component_1 = require("./about/about.component");
var contact_component_1 = require("./contact/contact.component");
var home_component_1 = require("./home/home.component");
var home_service_1 = require("./home/shared/home.service");
<<<<<<< HEAD
=======
var login_component_1 = require("./login/login.component");
var authentication_service_1 = require("./login/shared/authentication.service");
var map_component_1 = require("./map/map.component");
>>>>>>> 19f84f602a56dba48abcbcd6fed40ccbbf474d3d
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            app_routes_1.routing,
            http_1.HttpModule
        ],
        declarations: [app_component_1.AppComponent,
            about_component_1.AboutComponent,
            contact_component_1.ContactComponent,
<<<<<<< HEAD
            home_component_1.HomeComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [home_service_1.HomeService]
=======
            home_component_1.HomeComponent,
            login_component_1.LoginComponent,
            map_component_1.MapComponent
        ],
        bootstrap: [app_component_1.AppComponent],
        providers: [home_service_1.HomeService, authentication_service_1.AuthenticationService]
>>>>>>> 19f84f602a56dba48abcbcd6fed40ccbbf474d3d
    })
], AppModule);
exports.AppModule = AppModule;
