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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomePageComponent,
    SearchComponent,
    AlertComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [UserServiceClient, AlertServiceClient, PostServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
