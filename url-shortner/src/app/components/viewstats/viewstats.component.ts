import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route:ActivatedRoute,private firebaseService:FirebaseAuthService,private _route:Router) { 
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

  public pieChartLabels2: Label[] = [];
  public pieChartData2: number[] = [];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];

  public pieChartLabels3: Label[] = [];
  public pieChartData3: number[] = [];
  public pieChartType3: ChartType = 'pie';
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [];

  public barChartLabels: Label[] = [];
  public barChart2Type: ChartType = 'bar';
  public barChart2Legend = false;
  public barChart2Plugins = [];
  public barChart2Data: number[] = [];

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

  public barChart2Options: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
    }
  };

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend:{
      position:"top",
      
    }
  };

  async ngOnInit(): Promise<void> {
    var user=localStorage.getItem("user")
    if(user===null){
        this._route.navigate(['/'])
    }
    this.key=this.route.snapshot.paramMap.get("key")
    
    this.logs=await this.firebaseService.get_logs(this.key)
    if (this.logs==null){
      this.no_data=true
    }
    else{
      console.log(this.logs);
      for(var log of this.logs){
        if(!this.pieChartLabels1.includes(log.os)){
          this.pieChartLabels1.push(log.os)
          this.pieChartData1.push(1)
        }
        else{
          this.pieChartData1[this.pieChartLabels1.indexOf(log.os)]+=1
        }

        if(!this.pieChartLabels2.includes(log.browser)){
          this.pieChartLabels2.push(log.browser)
          this.pieChartData2.push(1)
        }
        else{
          this.pieChartData2[this.pieChartLabels2.indexOf(log.browser)]+=1
        }

        if(!this.pieChartLabels3.includes(log.deviceType)){
          this.pieChartLabels3.push(log.deviceType)
          this.pieChartData3.push(1)
        }
        else{
          this.pieChartData3[this.pieChartLabels3.indexOf(log.deviceType)]+=1
        }

        if(!this.barChartLabels.includes(log.country)){
          this.barChartLabels.push(log.country);
          this.barChart2Data.push(1);
        }
        else{
          this.barChart2Data[this.barChartLabels.indexOf(log.country)] += 1
        }
      }
    }
  }

}
