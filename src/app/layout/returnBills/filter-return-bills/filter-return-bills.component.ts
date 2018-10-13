import { Component, OnInit } from '@angular/core';
import { ReturnBill } from '../../../shared/DTOs/returnBill';
import { ReturnBillService } from '../return-bill.service';
import { ConfigService, IConfig } from '../../../app.config';
import { Filter } from '../../../shared/DTOs/filter';
import { CustomersService } from '../../customers/customers.service';
import { Customer } from '../../../shared/DTOs/customer';

@Component({
  selector: 'app-filter-return-bills',
  templateUrl: './filter-return-bills.component.html',
  styleUrls: ['./filter-return-bills.component.scss']
})
export class FilterReturnBillsComponent implements OnInit {
  config:IConfig;
filteredBills:ReturnBill[]=[];
filter:Filter=new Filter();
customers:Customer[] =[];
loading:boolean=false;
selectedCustomer:Customer=new Customer();
  constructor(private returnBillService:ReturnBillService,private configService:ConfigService,private customerService:CustomersService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
   this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(customers=>{
     this.customers = customers;
   })
  }

  filterBills(){
    this.loading=true;
    this.filter.customerId=this.selectedCustomer.id;
    this.returnBillService.filterReturnBills(this.config.filterReturnBillsUrl,this.filter).subscribe(returnBills =>{
      this.filteredBills = returnBills;
      this.loading=false;
    })
  }
}
