import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { QuillEditorModule } from 'ngx-quill-editor';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/user/login/login.component';
import { ProfileComponent } from './views/user/profile/profile.component';
import { RegisterComponent } from './views/user/register/register.component';
import { WebsiteListComponent } from './views/website/website-list/website-list.component';
import { WebsiteNewComponent } from './views/website/website-new/website-new.component';
import { WebsiteEditComponent } from './views/website/website-edit/website-edit.component';
import { PageListComponent } from './views/page/page-list/page-list.component';
import { PageEditComponent } from './views/page/page-edit/page-edit.component';
import { PageNewComponent } from './views/page/page-new/page-new.component';
import { WidgetChooserComponent } from './views/widget/widget-chooser/widget-chooser.component';
import { WidgetHeadingComponent } from './views/widget/widget-edit/widget-heading/widget-heading.component';
import { WidgetImageComponent } from './views/widget/widget-edit/widget-image/widget-image.component';
import { WidgetListComponent } from './views/widget/widget-list/widget-list.component';
import { WidgetYoutubeComponent } from './views/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetHtmlComponent } from './views/widget/widget-edit/widget-html/widget-html.component';

// client service
import { UserService } from './services/user.service.client';
import { WebsiteService } from './services/website.service.client';
import { PageService } from './services/page.service.client';
import { WidgetService } from './services/widget.service.client';
import { HomeComponent } from './home/home.component';

import {SortableDirective} from './views/widget/widget-list/sortable.directive';
import {FlickrImageSearchComponent} from './views/widget/widget-edit/widget-image/flickr-image-search.component';
import {FlickrService} from './services/flickr.service.client';
import { WidgetTextComponent } from './views/widget/widget-edit/widget-text/widget-text.component';
import { SharedService } from './services/shared.service';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteListComponent,
    WebsiteNewComponent,
    WebsiteEditComponent,
    PageListComponent,
    PageEditComponent,
    PageNewComponent,
    WidgetChooserComponent,
    WidgetHeadingComponent,
    WidgetImageComponent,
    WidgetListComponent,
    WidgetYoutubeComponent,
    HomeComponent,
    SortableDirective,
    FlickrImageSearchComponent,
    WidgetHtmlComponent,
    WidgetTextComponent
  ],
  imports: [
    QuillEditorModule,
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    routing
  ],
  providers: [UserService, WebsiteService, PageService, WidgetService, FlickrService, SharedService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
