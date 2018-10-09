import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { VendorBillService } from '../vendor-bill.service';

@Component({
  selector: 'app-this-week-vendor-bills',
  templateUrl: './this-week-vendor-bills.component.html',
  styleUrls: ['./this-week-vendor-bills.component.scss']
})
export class ThisWeekVendorBillsComponent implements OnInit {

  config:IConfig;
  bills:VendorBill[]=[]; 
  constructor(private vendorBillService:VendorBillService,private configService: ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisWeekVendorBills();
  }

  getThisWeekVendorBills()
  {
    this.vendorBillService.getThisWeekVendorBills(this.config.getThisWeekVendorBillsUrl,null).subscribe(bills=>{
      this.bills=bills;

    });
  }

}
