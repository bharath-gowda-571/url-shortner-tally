import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from 'src/app/services/redirection.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-redirection',
  templateUrl: './redirection.component.html',
  styleUrls: ['./redirection.component.scss']
})
export class RedirectionComponent implements OnInit {

  constructor(private _service:RedirectionService,private _router:ActivatedRoute) {}
 
  async ngOnInit(): Promise<void> {
    var res = await this._service.viewLink(this._router.snapshot.url[0]['path'])
    console.log(res)

    if(res){
      window.location.href = String(res)

    }
  }
}
