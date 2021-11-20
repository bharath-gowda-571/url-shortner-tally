import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {getAuth} from 'firebase/auth'
import {HttpClient} from '@angular/common/http'
import {logs} from '../models'

interface UserLink{
  fullink:string,
  link:string
}

@Injectable({
  providedIn: 'root'
})



export class FirebaseAuthService {
  isLoggedIn=false
  
  constructor(public firebaseAuth:AngularFireAuth ,private _http:HttpClient) { }
  
  async signin(email:string,password:string){
    var error_msg=""
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn=true
      const auth = getAuth();
      const user = auth.currentUser;
      var uid=user?.uid
      localStorage.setItem('user',uid!.toString())

    }).catch(e=>{
      error_msg="Wrong Email or Password"
    })
    return error_msg
  }

  async signup(email:string,password:string,first_name:string,last_name:string){
    var error_msg=""
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn=true
      const auth = getAuth();
      const user = auth.currentUser;
      var uid=user?.uid
      localStorage.setItem('user',uid!.toString())
      
      this._http.put<Map<string,string>>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid+".json",{"first_name":first_name,"last name":last_name}).subscribe(data=>{
      })  
    }).catch(e=>{
      var e_str=e.toString();
      if(e_str.search("email-already-in-use")!=-1){
        error_msg="User already exists"
      }
      else if(e_str.search("invalid-email")!=-1){
        error_msg="Invalid Email"
      }
      else if(e_str.search("weak-password")!=-1){
        error_msg="Weak Password" 
      }
      return error_msg
    })
  return error_msg
    
  }
  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
  async getUserFirstName(){
    var uid=localStorage.getItem("user")
    var first_name= await this._http.get("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid!.toString()+"/first_name.json").toPromise()
    return first_name
  }

  async getListofKeys(){

    return await this._http.get("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls.json").toPromise()
  }
  async add_new_link(short_link:string,long_link:string){
    this._http.put<Map<string,string>>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+short_link+".json",{"fullink":long_link}).subscribe(data=>{
      })
      var uid=localStorage.getItem("user")
      var user_links=await this._http.get<UserLink[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid+"/links.json").toPromise()
      console.log(user_links)
      if(user_links==null){
        user_links=[]
      }
      user_links.push(<UserLink>{
        fullink:long_link,
        link:short_link
      })
    this._http.put<Map<string,string>>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid+"/links.json",user_links).subscribe(data=>{
    })
  }

  async get_logs(key:string){
    return await this._http.get<logs[]>("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/shortened_urls/"+key+"/logs.json").toPromise()
  }
}
