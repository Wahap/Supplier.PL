import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { VendorBillService } from '../vendor-bill.service';

@Component({
  selector: 'app-this-month-vendor-bills',
  templateUrl: './this-month-vendor-bills.component.html',
  styleUrls: ['./this-month-vendor-bills.component.scss']
})
export class ThisMonthVendorBillsComponent implements OnInit {

  config:IConfig;
  bills:VendorBill[]=[]; 
  constructor(private vendorBillService:VendorBillService,private configService: ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthVendorBills();
  }

  getThisMonthVendorBills()
  {
    this.vendorBillService.getThisMonthVendorBills(this.config.getThisMonthVendorBillsUrl,null).subscribe(bills=>{
      this.bills=bills;

    });
  }


}
