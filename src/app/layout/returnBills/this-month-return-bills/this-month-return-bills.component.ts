import { Component, OnInit } from '@angular/core';
import { ReturnBillService } from '../return-bill.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ReturnBill } from '../../../shared/DTOs/returnBill';

@Component({
  selector: 'app-this-month-return-bills',
  templateUrl: './this-month-return-bills.component.html',
  styleUrls: ['./this-month-return-bills.component.scss']
})
export class ThisMonthReturnBillsComponent implements OnInit {
  config:IConfig;
  allBills:ReturnBill[]=[];
  constructor(private returnBillService:ReturnBillService,private configService:ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthReturnBills();
  }

  getThisMonthReturnBills()
  {
    this.returnBillService.getThisMonthReturnBills(this.config.getThisMonthReturnBillsUrl,null).subscribe(returnBills=>{
      this.allBills=returnBills;

    });
  }

}
