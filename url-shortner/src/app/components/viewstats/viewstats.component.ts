import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-viewstats',
  templateUrl: './viewstats.component.html',
  styleUrls: ['./viewstats.component.scss']
})
export class ViewstatsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private firebaseService:FirebaseAuthService) { }
  public key!:any;
  async ngOnInit(): Promise<void> {
    this.key=this.route.snapshot.paramMap.get("key")
    // console.log(this.key)
    console.log(await this.firebaseService.get_logs(this.key))
  }

}
