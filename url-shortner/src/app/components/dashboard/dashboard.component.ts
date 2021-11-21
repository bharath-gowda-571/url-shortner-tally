import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Links } from 'src/app/models';
import { RedirectionService } from 'src/app/services/redirection.service'; 
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { getAuth } from '@firebase/auth';
import { LogsService } from 'src/app/services/logs.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

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
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  constructor(private router:Router,private firebaseService:FirebaseAuthService, private _redirectionService:RedirectionService,public logsService:LogsService) { }

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
    this.logsService.getUserLocation()
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }
    
    var Uid = localStorage.getItem("user")
    this._redirectionService.getHisLinks(Uid!).subscribe((data:Links[]) => {
      this.links = data;
      this.links=this.links.reverse()

    })
    this.error_msg=""
    this.small_link_value=""
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }
    else{
       
      this.userfirstname=await this.firebaseService.getUserFirstName();
      this.keys=await this.firebaseService.getListofKeys()
      for(var key of Object.keys(this.keys)){
        this.keys_list.push(key)
      }
      
      this.keys_list=[...this.keys_list,"dashboard","signup","signin",""]
    } 
  }

  async shortenNewLink(small_url:string,long_link:string){
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
      await this.firebaseService.add_new_link(small_url,long_link)
      location.reload()
    }
  }
  generateRandomLink(){
    var rand_str=this.randomString(8)
    while(this.keys_list.includes(rand_str)){
      rand_str=this.randomString(8)
    }
    this.small_link_value=rand_str
  }
  viewStats(key:string){
    this.router.navigate(['/viewstats',key])
  }
  async delete_link(key:string){
    await this.firebaseService.delete_link(key)
    location.reload()
  }
}
