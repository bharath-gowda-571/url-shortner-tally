import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {getAuth} from 'firebase/auth'
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn=false
  
  constructor(public firebaseAuth:AngularFireAuth ,private _http:HttpClient) { }
  
  async signin(email:string,password:string){
    var error_msg=""
    await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
      console.log(res)
      this.isLoggedIn=true
      localStorage.setItem('user',JSON.stringify(res.user))
    }).catch(e=>{
      error_msg="Wrong Email or Password"
    })
    return error_msg
  }

  async signup(email:string,password:string,first_name:string,last_name:string){
    var error_msg=""
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(res=>{
      this.isLoggedIn=true
      localStorage.setItem('user',JSON.stringify(res.user))
      const auth = getAuth();
      const user = auth.currentUser;
      var uid=user?.uid
      console.log(uid)
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
  async getUserName(uid:any){
    console.log(uid)
    var first_name= await this._http.get("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid.toString()+"/first_name.json").toPromise()
    var last_name= await this._http.get("https://url-shortner-418d4-default-rtdb.asia-southeast1.firebasedatabase.app/users/"+uid.toString()+"/last name.json").toPromise()
    // print(first_name)
    console.log(first_name)
    return first_name+" "+last_name
  }
}
