import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  device!:any
  constructor( private detector:DeviceDetectorService) { }

  ngOnInit(): void {
    this.device = this.detector
  }

}
