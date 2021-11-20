import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Links, logs } from '../models';
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
    var ip=await this.http.get<IPFormat>("http://api.ipify.org/?format=json").toPromise()
    console.log(ip)
    var location_data=await this.http.get<Location>("https://ipapi.co/"+ip.ip+"/json/").toPromise()
    logs1.city = location_data.city
    logs1.country = location_data.country_name
    logs1.state = location_data.region
    logs1.latitude = location_data.latitude
    logs1.longitude = location_data.longitude
    var arr:logs[] = [];
    var newLog = logs1;
    this.http.get<logs[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/" + short_url +"/logs.json")
    .subscribe((data) => {
      if(data!=null){
      arr = data;
      }
      arr.push(newLog!);
      this.addLog1(short_url, arr)
      });
  }

  addLog1(short_url:string, arr:logs[]){
    this.http.put<String[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/" + short_url +"/logs.json", arr).subscribe(data =>console.log(data))
  }
}
