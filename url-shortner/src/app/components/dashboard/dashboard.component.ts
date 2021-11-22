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

  public no_links=false
  async ngOnInit(): Promise<void> {
    this.logsService.getUserLocation()
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }
    
    var Uid = localStorage.getItem("user")
    this._redirectionService.getHisLinks(Uid!).subscribe((data:Links[]) => {
      this.links = data;
      if(this.links==null){
        this.no_links=true
      }
      else{
      this.links=this.links.reverse()
      }

    })
    this.error_msg=""
    this.small_link_value=""
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }
    else{
       
      this.userfirstname=await this.firebaseService.getUserFirstName();
      
    } 
  }

  async shortenNewLink(small_url:string,long_link:string){
    var check=await this.firebaseService.check_if_exists(small_url)
    const reg = '(https://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    var regexp = new RegExp('(https://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
    var list_of_predefined_routes=["signin","signup","dashboard","viewstats","error","noConnection"]
    if(long_link==""){
      this.error_msg="Link cannot be empty"
    }
    else if(small_url==""){
      this.error_msg="Link cannot be empty"
    }
    else if(!regexp.test(long_link))
    {
      this.error_msg="Please Enter a valid url"
    }
    else if(check===true){
      this.error_msg="Sorry, the link you have chosen already exists"
    }
    else if(list_of_predefined_routes.includes(small_url)){
      this.error_msg="Sorry, the link you have is a predefined route"
    }
    else{
      await this.firebaseService.add_new_link(small_url,long_link)
      location.reload()
    }
  }
  generateRandomLink(){
    var rand_str=this.randomString(8)
    while(!this.firebaseService.check_if_exists(rand_str)){
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
