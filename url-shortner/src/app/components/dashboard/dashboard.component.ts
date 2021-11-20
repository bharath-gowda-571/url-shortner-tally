import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from 'src/app/models';
import { RedirectionService } from 'src/app/services/redirection.service'; 
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { getAuth } from '@firebase/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userfirstname!:any;
  public keys:any;
  public keys_list:string[]=[];
  public small_link_value=""
  public error_msg=""

  constructor(private router:Router,private firebaseService:FirebaseAuthService, private _redirectionService:RedirectionService) { }

randomString(length:number) {

    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    var result = '';

    for ( var i = 0; i < length; i++ ) {

        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

    }
    return result;

  }

  links!:Links[];


  async ngOnInit(): Promise<void> {
    
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }

    
    var Uid = localStorage.getItem("user")
    this._redirectionService.getHisLinks(Uid!).subscribe((data:Links[]) => {
      this.links = data;
    })
  


    this.error_msg=""
    this.small_link_value=""
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }
    else{
       
      this.userfirstname=await this.firebaseService.getUserFirstName();
      this.keys=await this.firebaseService.getListofKeys()
      console.log(this.keys)
      for(var key of Object.keys(this.keys)){
        this.keys_list.push(key)
      }
      
      this.keys_list=[...this.keys_list,"dashboard","signup","signin",""]
      console.log(this.keys_list)
    } 
  }

  shortenNewLink(small_url:string,long_link:string){
    if(long_link==""){
      this.error_msg="Link cannot be empty"
    }
    else if(small_url==""){
      this.error_msg="Link cannot be empty"
    }
    else if(this.keys_list.includes(small_url)){
      this.error_msg="Sorry, the link u have chosen already exists"
    }
    else{
      this.firebaseService.add_new_link(small_url,long_link)
    }
  }
  generateRandomLink(){
    var rand_str=this.randomString(8)
    while(this.keys_list.includes(rand_str)){
      rand_str=this.randomString(8)
    }
    this.small_link_value=rand_str
  }
  
}
