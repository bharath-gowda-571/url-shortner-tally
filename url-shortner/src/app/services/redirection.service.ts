import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Links } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {
  public GEOCODEAPIKEY="AIzaSyB_CpzSbB7UHl1lTC7bp1Mui8mwkjbBgU0"
  constructor(private readonly http:HttpClient) {}

  // async get_addr(lat:number,long:number){
  //   return await this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key="+this.GEOCODEAPIKEY).toPromise()
  // }
  viewLink(short_url: string): Promise<String>{
    return this.http.get<String>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+ short_url+"/fullink.json").toPromise();
  }

  getHisLinks(userId: string): Observable<Links[]>{
    return this.http.get<Links[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/" + userId + "/links.json");
  }
}
