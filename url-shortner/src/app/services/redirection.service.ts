import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectionService {

  constructor(private readonly http:HttpClient) {}

  viewLink(short_url: string): Promise<String>{
    return this.http.get<String>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+ short_url+".json").toPromise();
  }
}
