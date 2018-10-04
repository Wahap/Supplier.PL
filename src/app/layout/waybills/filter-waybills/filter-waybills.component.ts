import { Component, OnInit } from '@angular/core';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { Filter } from '../../../shared/DTOs/filter';
import { CustomersService } from '../../customers/customers.service';
import { Customer } from '../../../shared/DTOs/customer';
import { ConfigService, IConfig } from '../../../app.config';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-filter-waybills',
  templateUrl: './filter-waybills.component.html',
  styleUrls: ['./filter-waybills.component.scss']
})
export class FilterWaybillsComponent implements OnInit {
filteredWaybills:Waybill[]=[];
filter:Filter=new Filter();
config:IConfig;
customers:Customer[]=[];
selectedCustomer:Customer=new Customer();
loading:boolean=false;
  constructor(private customerService:CustomersService,private configService:ConfigService,private waybillService:WaybillService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
   this.getCustomers();
  }

  getCustomers()
  {
    this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(customers=>{
      this.customers=customers;
    });
  }

  filterWaybills()
  {
    this.loading=true;
    this.filter.customerId=this.selectedCustomer.id;
    this.waybillService.filterWaybills(this.config.filterWaybillsUrl,this.filter).subscribe(waybills=>{
      this.filteredWaybills=waybills;
      this.loading=false;
    });
  }

}
