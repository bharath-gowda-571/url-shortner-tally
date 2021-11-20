import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isSignedIn=false
  constructor(public firebaseService:FirebaseAuthService) { }
  
  error_msg=""

  ngOnInit(): void {
    this.error_msg=""
    if(localStorage.getItem("user")!==null)
    {
      this.isSignedIn=true
    }
    else
    this.isSignedIn=false
  
  }

  async onSignUp(email:string,password:string,confirmpassword:string,firstname:string,lastname:string){
    if(password!=confirmpassword){
      this.error_msg="Confirm password doesn't match"
    }
    else{
      var returned=await this.firebaseService.signup(email,password,firstname,lastname)
      if(returned!=""){
        this.error_msg=returned
      }
    }
    
    

    if(this.firebaseService.isLoggedIn)
    this.isSignedIn=true
  }

} 
