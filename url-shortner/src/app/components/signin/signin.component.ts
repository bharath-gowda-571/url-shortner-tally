import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private firebaseService:FirebaseAuthService,private _router:Router) { }
  error_msg=""
  isSignedIn=false
  ngOnInit(): void {
    this.error_msg=""
    if(localStorage.getItem("user")!==null)
    {
      this.isSignedIn=true
    }
    else
    this.isSignedIn=false
  }
  async onSignIn(email:string,password:string){
    
      var returned=await this.firebaseService.signin(email,password)
      console.log(returned)
      if(returned!=""){
        this.error_msg=returned

      }
      else{
        this._router.navigate(["/home"])
      }
    if(this.firebaseService.isLoggedIn)
      this.isSignedIn=true

  }
  
}
