import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import {logs} from '../../models'
import { ChartType, ChartOptions,ChartDataSets   } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-viewstats',
  templateUrl: './viewstats.component.html',
  styleUrls: ['./viewstats.component.scss']
})
export class ViewstatsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private firebaseService:FirebaseAuthService) { 
    monkeyPatchChartJsLegend();
    monkeyPatchChartJsTooltip();
  }
  // 1 is for os
  public key!:any;
  public logs!:logs[];
  public no_data=false;
  public pieChartLabels1: Label[] = [];
  public pieChartData1: number[] = [];

  public pieChartType1: ChartType = 'pie';
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];
  public donutColors1=[
    {
      backgroundColor: [
          'rgba(92, 184, 92,1)',
          'rgba(255, 195, 0, 1)',
          'rgba(217, 83, 79,1)',
          'rgba(129, 78, 40, 1)',
          'rgba(129, 199, 111, 1)'
      ]
    }
  ];
  public pieChartOptions1: ChartOptions = {
    responsive: true,
    legend:{
      position:"top",
      
    }
  };

  async ngOnInit(): Promise<void> {
    this.key=this.route.snapshot.paramMap.get("key")
    
    this.logs=await this.firebaseService.get_logs(this.key)
    if (this.logs==null){
      this.no_data=true
    }
    else{
      for(var log of this.logs){
        if(!this.pieChartLabels1.includes(log.os)){
          this.pieChartLabels1.push(log.os)
          this.pieChartData1.push(1)
        }
        else{
          this.pieChartData1[this.pieChartLabels1.indexOf(log.os)]+=1
        }
      }
      console.log(this.pieChartLabels1)
      console.log(this.pieChartData1)
    }
  }

}
