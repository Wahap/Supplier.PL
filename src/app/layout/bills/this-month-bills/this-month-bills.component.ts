import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Bill } from '../../../shared/DTOs/Bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-this-month-bills',
  templateUrl: './this-month-bills.component.html',
  styleUrls: ['./this-month-bills.component.scss']
})
export class ThisMonthBillsComponent implements OnInit {

  config:IConfig;
  bills:Bill[]=[]; 
  constructor(private billService:BillService,private configService: ConfigService) { }


  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthBills();
  }

  getThisMonthBills()
  {
    this.billService.getThisMonthBills(this.config.getThisMonthBillsUrl,null).subscribe(bills=>{
      this.bills=bills;

    });
  }

}
