import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RedirectionComponent } from './components/redirection/redirection.component';

import { ErrorpageComponent } from './components/errorpage/errorpage.component';

import { SignupComponent } from './components/signup/signup.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClipboardModule } from "ngx-clipboard";
import { ViewstatsComponent } from './components/viewstats/viewstats.component'
import { ChartsModule } from 'ng2-charts';
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { NoInternetComponent } from './components/no-internet/no-internet.component';
const firebaseConfig = {
  apiKey: "AIzaSyCYdVjp9Umiql063Ta4j4THoWtHdD9wlUc",
  authDomain: "url-shortner-418d4.firebaseapp.com",
  projectId: "url-shortner-418d4",
  storageBucket: "url-shortner-418d4.appspot.com",
  messagingSenderId: "170946501040",
  appId: "1:170946501040:web:76780a4aa67f1a0db15e75"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RedirectionComponent,

    ErrorpageComponent,
    SignupComponent,
    SigninComponent,
    DashboardComponent,
    ViewstatsComponent,
    NoInternetComponent

  ],
  imports: [
    ChartsModule,
    NgxQRCodeModule,
    ClipboardModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
