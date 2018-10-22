import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { IConfig, ConfigService } from '../../../app.config';
import { BillService } from '../bill.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-this-week-bills',
  templateUrl: './this-week-bills.component.html',
  styleUrls: ['./this-week-bills.component.scss']
})
export class ThisWeekBillsComponent implements OnInit {
  config:IConfig;
  bills:Bill[]=[]; 
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private billService:BillService,private configService: ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisWeekBills();
  }

  getThisWeekBills()
  {
    this.billService.getThisWeekBills(this.config.getThisWeekBillsUrl,null).subscribe(bills=>{
      this.bills=bills;

    },error=>{
      this.toastr.error("Faturalar Getirilirken Bir Hata Meydana Geldi...");
    });
  }

}
