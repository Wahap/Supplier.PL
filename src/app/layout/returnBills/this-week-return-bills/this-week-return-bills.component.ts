import { Component, OnInit } from '@angular/core';
import { ReturnBillService } from '../return-bill.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ReturnBill } from '../../../shared/DTOs/returnBill';

@Component({
  selector: 'app-this-week-return-bills',
  templateUrl: './this-week-return-bills.component.html',
  styleUrls: ['./this-week-return-bills.component.scss']
})
export class ThisWeekReturnBillsComponent implements OnInit {
config:IConfig;
allBills:ReturnBill[]=[];
  constructor(private returnBillService:ReturnBillService,private configService:ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisWeekReturnBills();

  }

  getThisWeekReturnBills()
  {
    this.returnBillService.getThisWeekReturnBills(this.config.getThisWeekReturnBillsUrl,null).subscribe(returnBills=>{
      this.allBills=returnBills;

    });
  }

}
