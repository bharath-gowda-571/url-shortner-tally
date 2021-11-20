import { Component, OnInit } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  device!:any
  constructor( private detector:DeviceDetectorService,private _router:Router) { }
    

  ngOnInit(): void {
    this.device = this.detector
    console.log(this.device)
    if(localStorage.getItem("user")!==null){
      this._router.navigate(['/dashboard'])
    }
  }

}
