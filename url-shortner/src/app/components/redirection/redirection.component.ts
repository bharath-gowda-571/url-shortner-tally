import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { logs } from 'src/app/models';
import { RedirectionService } from 'src/app/services/redirection.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {

  constructor(private service:RedirectionService,private router:ActivatedRoute, private detector:DeviceDetectorService) {}
 
  async ngOnInit(): Promise<void> {
    console.log(this.router.snapshot.url[0]['path'])
    var res = await this.service.viewLink(this.router.snapshot.url[0]['path'])

    console.log(res)
    if(res){
      var logs1:logs = new logs();
      logs1.browser = this.detector.browser;
      logs1.device = this.detector.device;
      logs1.deviceType = this.detector.deviceType;
      logs1.os = this.detector.os;
      this.service.regLog(this.router.snapshot.url[0]['path'], logs1)
      // window.location.href = String(res)
    }
  }
}
