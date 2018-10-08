import { Component, OnInit } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { Filter } from '../../../shared/DTOs/filter';
import { IConfig, ConfigService } from '../../../app.config';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-filter-bills',
  templateUrl: './filter-bills.component.html',
  styleUrls: ['./filter-bills.component.scss']
})
export class FilterBillsComponent implements OnInit {
  filteredBills:Bill[]=[];
  filter:Filter=new Filter();
  config:IConfig;
  customers:Customer[]=[];
  selectedCustomer:Customer=new Customer();
  loading=false;
  constructor(private customerService:CustomersService,private configService:ConfigService,private billService:BillService) { }

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

  filterBills()
  {

    this.loading=true;
    this.filter.customerId=this.selectedCustomer.id;
  
    this.billService.filterBills(this.config.filterBillsUrl,this.filter).subscribe(bills=>{
      this.filteredBills=bills;
      this.loading=false;
    });
  }

}
