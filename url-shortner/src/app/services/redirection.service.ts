import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Links, logs } from '../models';
import { formatDate } from '@angular/common';

interface Location{
  city:string,
  country_name:string,
  region:string,
  latitude:number,
  longitude:number
}
interface IPFormat{
  ip:string
}

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {
  constructor(private readonly http:HttpClient) {}
  viewLink(short_url: string): Promise<String>{
    return this.http.get<String>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+ short_url+"/fullink.json").toPromise();
  }

  getHisLinks(userId: string): Observable<Links[]>{
    return this.http.get<Links[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/" + userId + "/links.json");
  }

  async regLog(short_url:string, logs1:logs){
    var today =new Date()
    // var ip=await this.http.get<IPFormat>("https://api64.ipify.org?format=json").toPromise() 
    // var location_data=await this.http.get<Location>("https://ipapi.co/"+ip.ip+"/json/").toPromise()
    //logs1.city = location_data.city
    //logs1.country = location_data.country_name
    //logs1.state = location_data.region
    //logs1.latitude = location_data.latitude
    //logs1.longitude = location_data.longitude
    logs1.date = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0000')
    var arr:logs[] = [];
    var newLog = logs1;
    var data = await this.http.get<logs[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/" + short_url +"/logs.json")
    .toPromise();
    if(data!=null){
      arr = data;
    }
    arr.push(newLog!);
    return await this.addLog1(short_url, arr)
  }

  async addLog1(short_url:string, arr:logs[]){
    return await this.http.put<String[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/" + short_url +"/logs.json", arr).toPromise()
  }
}
