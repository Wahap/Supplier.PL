import { Component, OnInit } from '@angular/core';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { Filter } from '../../../shared/DTOs/filter';
import { IConfig, ConfigService } from '../../../app.config';
import { VendorBillService } from '../vendor-bill.service';

@Component({
  selector: 'app-filter-vendor-bills',
  templateUrl: './filter-vendor-bills.component.html',
  styleUrls: ['./filter-vendor-bills.component.scss']
})
export class FilterVendorBillsComponent implements OnInit {

  filteredBills:VendorBill[]=[];
  filter:Filter=new Filter();
  config:IConfig;
  loading=false;
  constructor(private configService:ConfigService,private vendorBillService:VendorBillService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
   
  }

  

  filterBills()
  {

    this.loading=true;
   
  
    this.vendorBillService.filterVendorBills(this.config.filterVendorBillsUrl,this.filter).subscribe(bills=>{
      this.filteredBills=bills;
      this.loading=false;
    });
  }

}
