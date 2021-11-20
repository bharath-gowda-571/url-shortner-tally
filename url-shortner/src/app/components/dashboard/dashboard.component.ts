import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Links } from 'src/app/models';
import { RedirectionService } from 'src/app/services/redirection.service'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router, private _redirectionService:RedirectionService) { }

  links!:Links[];
  async ngOnInit(): Promise<void> {
    if(localStorage.getItem("user")===null){
      this.router.navigate(['/'])
    }

    var auth = getAuth()
    var Uid = auth.currentUser?.uid
    this._redirectionService.getHisLinks(Uid?Uid:"").subscribe((data:Links[]) => {
      this.links = data;
    })
  }

  copie(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
