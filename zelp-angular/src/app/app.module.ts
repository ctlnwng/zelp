import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import {UserServiceClient} from './services/user.service.client';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [UserServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
