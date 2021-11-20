import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Links } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  constructor(private readonly http:HttpClient) {}

  viewLink(short_url: string): Promise<String>{
    return this.http.get<String>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+ short_url+".json").toPromise();
  }

  getHisLinks(userId: string): Observable<Links[]>{
    return this.http.get<Links[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/" + userId + "/links.json");
  }
}
