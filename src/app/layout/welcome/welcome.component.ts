import { Component, OnInit } from '@angular/core';
import { BillService } from '../bills/bill.service';
import { CommonService } from '../../shared/common.service';
import { ConfigService, IConfig } from '../../app.config';
import { DashBoard } from '../../shared/DTOs/dashBoard';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  dashBoard:DashBoard=new DashBoard();
  config:IConfig;
  constructor(private billService:BillService, private commonService:CommonService,private configService:ConfigService) {
   
  }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getDashBoardData();
  }

  getDashBoardData()
  {
    this.commonService.getDashBoardData(this.config.getDashBoardDataUrl,null).subscribe(data=>{

     this.dashBoard.numberOfUnpaidBills=data.numberOfUnpaidBills;
     this.dashBoard.numberOfOverDueBills=data.overDueBills;
     console.log(data);
    });
  }

}
