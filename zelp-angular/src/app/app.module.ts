import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import {UserServiceClient} from './services/user.service.client';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';
import {AlertServiceClient} from './services/alert.service.client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomePageComponent,
    SearchComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [
    UserServiceClient,
    AlertServiceClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
