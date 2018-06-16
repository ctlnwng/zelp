import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { UserServiceClient } from "./services/user.service.client";
import { SearchComponent } from "./search/search.component";
import { AlertComponent } from "./alert/alert.component";
import { AlertServiceClient } from "./services/alert.service.client";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostServiceClient } from "./services/post.service.client";
import { PostComponent } from "./post/post.component";
import { SearchServiceClient } from "./services/search.service.client";
import { NewResponseComponent } from "./new-response/new-response.component";
import { NavComponent } from './nav/nav.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import {RestaurantServiceClient} from './services/restaurant.service.client';
import {ResponseServiceClient} from './services/response.service.client';
import { ResponseComponent } from './response/response.component';
import { SearchResultComponent } from './search-result/search-result.component';
import {DataServiceClient} from './services/data.service.client';
import {LoggedinServiceClient} from './services/loggedin.service.client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomePageComponent,
    SearchComponent,
    AlertComponent,
    NewPostComponent,
    PostComponent,
    NewResponseComponent,
    NavComponent,
    RestaurantComponent,
    ResponseComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    UserServiceClient,
    AlertServiceClient,
    PostServiceClient,
    SearchServiceClient,
    RestaurantServiceClient,
    DataServiceClient,
    ResponseServiceClient,
    LoggedinServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
