import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public styles:string[]=Array(3).fill("nav-item")
  public currentIndex:number=0;
  isloggedIn=false
  // public userFullName!:string;
  

  constructor(private _router:Router,public firebaseService:FirebaseAuthService) {
   }

  async ngOnInit(): Promise<void> {
    

    if(localStorage.getItem("user")!==null){
      this.isloggedIn=true
    }
    else{
      console.log("here")
      
      this.isloggedIn=false
    }
  }

  signOut(){
    this.firebaseService.logout()
    this.isloggedIn=false
  }
  
  switchStyleOfNavs(choice:number){

    switch(choice){
      case 0:
        this.styles.fill("nav-item")
        this.styles[0]="nav-item active"
        this.currentIndex=0
        break
      case 1:
          this.styles.fill("nav-item")
          this.styles[1]="nav-item active"
          this.currentIndex=1
          break
      case 2:
          this.styles.fill("nav-item")
          this.styles[2]="nav-item active"
          this.currentIndex=2
          break
      
    }
  }
}
