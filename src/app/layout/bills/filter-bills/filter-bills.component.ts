import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { Filter } from '../../../shared/DTOs/filter';
import { IConfig, ConfigService } from '../../../app.config';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { BillService } from '../bill.service';
import { ToastsManager } from 'ng2-toastr';

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
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private customerService:CustomersService,private configService:ConfigService,private billService:BillService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
   this.getCustomers();
  }

  getCustomers()
  {
    this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(customers=>{
      this.customers=customers;
    },error=>{
      this.toastr.error("Müşteriler Getirilirken Bir Hata Meydana Geldi...");
    });
  }

  filterBills()
  {

    this.loading=true;
    this.filter.customerId=this.selectedCustomer.id;
  
    this.billService.filterBills(this.config.filterBillsUrl,this.filter).subscribe(bills=>{
      this.filteredBills=bills;
      this.loading=false;
    },error=>{
      this.toastr.error("Faturalar Getirilirken Bir Hata Meydana Geldi...");
    });
  }

}
