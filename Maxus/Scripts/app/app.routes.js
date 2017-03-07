"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var contact_routes_1 = require("./contact/contact.routes");
var about_routes_1 = require("./about/about.routes");
var home_routes_1 = require("./home/home.routes");
var login_routes_1 = require("./login/login.routes");
var map_routes_1 = require("./map/map.routes");
// Route Configuration
exports.routes = [
    //default
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
].concat(contact_routes_1.contactRoutes, about_routes_1.aboutRoutes, home_routes_1.homeRoutes, login_routes_1.loginRoutes, map_routes_1.mapRoutes);
exports.routing = router_1.RouterModule.forRoot(exports.routes);
