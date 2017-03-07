"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var contact_routes_1 = require("./contact/contact.routes");
var about_routes_1 = require("./about/about.routes");
var home_routes_1 = require("./home/home.routes");
<<<<<<< HEAD
=======
var login_routes_1 = require("./login/login.routes");
var map_routes_1 = require("./map/map.routes");
>>>>>>> 19f84f602a56dba48abcbcd6fed40ccbbf474d3d
// Route Configuration
exports.routes = [
    //default
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
<<<<<<< HEAD
].concat(contact_routes_1.contactRoutes, about_routes_1.aboutRoutes, home_routes_1.homeRoutes);
=======
].concat(contact_routes_1.contactRoutes, about_routes_1.aboutRoutes, home_routes_1.homeRoutes, login_routes_1.loginRoutes, map_routes_1.mapRoutes);
>>>>>>> 19f84f602a56dba48abcbcd6fed40ccbbf474d3d
exports.routing = router_1.RouterModule.forRoot(exports.routes);
