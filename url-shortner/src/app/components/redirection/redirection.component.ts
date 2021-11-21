import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { logs } from 'src/app/models';
import { RedirectionService } from 'src/app/services/redirection.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {

  constructor(private service:RedirectionService,private activatedRoute:ActivatedRoute,
     private detector:DeviceDetectorService, private router:Router) {}
 loading:any = null;
  async ngOnInit(): Promise<void> {
    var res = await this.service.viewLink(this.activatedRoute.snapshot.url[0]['path'])

    if(res){
      var logs1:logs = new logs();
      logs1.browser = this.detector.browser;
      logs1.device = this.detector.device;
      logs1.deviceType = this.detector.deviceType;
      logs1.os = this.detector.os;
      this.loading = await this.service.regLog(this.activatedRoute.snapshot.url[0]['path'], logs1)
      window.location.href = String(res)
    }
    else{
      this.router.navigateByUrl("/error")
    }
  }
}
