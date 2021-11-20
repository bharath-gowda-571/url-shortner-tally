import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
// import {getAuth} from 'firebase/auth'
import {HttpClient} from '@angular/common/http'

interface IPFormat{
  ip:string
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(public http:HttpClient) { }
  
  async getUserLocation(){
    var ip=await this.http.get<IPFormat>("http://api.ipify.org/?format=json").toPromise()
    console.log(ip)
    var location_data=await this.http.get("https://ipapi.co/"+ip.ip+"/json/").toPromise()
    console.log(location_data)
  }

}
