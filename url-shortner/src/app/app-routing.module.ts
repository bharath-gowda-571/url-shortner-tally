import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { RedirectionComponent } from './components/redirection/redirection.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:"signup",component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"home",component:HomeComponent},
  {path:"**",component:RedirectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
