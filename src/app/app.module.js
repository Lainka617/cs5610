"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var login_component_1 = require("./views/user/login/login.component");
var profile_component_1 = require("./views/user/profile/profile.component");
var register_component_1 = require("./views/user/register/register.component");
// import { WebsiteListComponent } from './views/website/website-list/website-list.component';
// import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
// import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
var page_list_component_1 = require("./views/page/page-list/page-list.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                profile_component_1.ProfileComponent,
                register_component_1.RegisterComponent,
                // WebsiteListComponent,
                // WebsiteNewComponent,
                // WebsiteEditComponent,
                page_list_component_1.PageListComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routing_1.routing
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
