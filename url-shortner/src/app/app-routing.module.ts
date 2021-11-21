import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { NoInternetComponent } from './components/no-internet/no-internet.component';
import { RedirectionComponent } from './components/redirection/redirection.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewstatsComponent } from './components/viewstats/viewstats.component';

const routes: Routes = [
  {path:"signup",component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"viewstats/:key",component:ViewstatsComponent},
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"error", component:ErrorpageComponent},
  {path:"noConnection", component:NoInternetComponent},
  {path:"**",component:RedirectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
