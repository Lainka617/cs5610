"use strict";
exports.__esModule = true;
var router_1 = require("@angular/router");
var login_component_1 = require("./views/user/login/login.component");
var profile_component_1 = require("./views/user/profile/profile.component");
var register_component_1 = require("./views/user/register/register.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'user/:uid', component: profile_component_1.ProfileComponent },
    { path: 'register', component: register_component_1.RegisterComponent }
    // { path: 'user/:uid/website' , component: WebsiteListComponent},
    // { path: 'user/:uid/website/:websiteid/page', component:PageListComponent}
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
