import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Bill } from '../../../shared/DTOs/Bill';
import { BillService } from '../bill.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-this-month-bills',
  templateUrl: './this-month-bills.component.html',
  styleUrls: ['./this-month-bills.component.scss']
})
export class ThisMonthBillsComponent implements OnInit {

  config:IConfig;
  bills:Bill[]=[]; 
  loading:boolean=true;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private billService:BillService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }


  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthBills();
  }

  getThisMonthBills()
  {
    this.billService.getThisMonthBills(this.config.getThisMonthBillsUrl,null).subscribe(bills=>{
      this.bills=bills;
      console.log(bills);

    },error=>{
      this.toastr.error("Faturalar Getirilirken Bir Hata Meydana Geldi...");
    },()=>{
      this.loading=false;
    });
  }

}
