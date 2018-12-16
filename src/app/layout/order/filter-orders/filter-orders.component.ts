import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Filter } from '../../../shared/DTOs/filter';
import { IConfig, ConfigService } from '../../../app.config';
import { Customer } from '../../../shared/DTOs/customer';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { ToastsManager } from 'ng2-toastr';
import { CustomersService } from '../../customers/customers.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-filter-orders',
  templateUrl: './filter-orders.component.html',
  styleUrls: ['./filter-orders.component.scss']
})
export class FilterOrdersComponent implements OnInit {

  filteredOrders:ReceivedOrder[]=[];
  filter:Filter=new Filter();
  config:IConfig;
  customers:Customer[]=[];
  selectedCustomer:Customer=new Customer();
  loading:boolean=false;
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private customerService:CustomersService,private configService:ConfigService,private orderService:OrderService) 
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
        this.toastr.error("Müşteriler getirilirken bir hata meydana geldi...");
      });
    }
  
    filterOrders()
    {
      this.loading=true;
      this.filter.customerId=this.selectedCustomer.id;
      this.orderService.filterOrders(this.config.filterOrdersUrl,this.filter).subscribe(orders=>{
        this.filteredOrders=orders;
       
      },error=>{
        this.toastr.error("Siparişler getirilirken bir hata meydana geldi...");
      },()=>{
        this.loading=false;
      });
    }
 
}
