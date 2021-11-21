import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService} from 'ng-connection-service';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'url-shortner';
  status = "Online";
  isConnected = true;
  currentUrl = "";

  constructor(private connectionService:ConnectionService, private router:Router){
    this.connectionService.monitor().subscribe(
      isConnected => {
        this.isConnected =isConnected;
        if(this.isConnected = isConnected)
        router.navigateByUrl(this.currentUrl);
        else{
          this.currentUrl = this.router.url;
          router.navigateByUrl("/noConnection"); 
        }
      }
    )
  }
}


