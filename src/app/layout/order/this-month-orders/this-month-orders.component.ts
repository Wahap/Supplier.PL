import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-this-month-orders',
  templateUrl: './this-month-orders.component.html',
  styleUrls: ['./this-month-orders.component.scss']
})
export class ThisMonthOrdersComponent implements OnInit {

  config:IConfig;
  loading:boolean=true;
  orders:ReceivedOrder[]=[];
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private orderService:OrderService,private configService: ConfigService) 
    {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthOrders();
  }
  getThisMonthOrders()
  {
    this.orderService.getThisMonthOrders(this.config.getThisMonthOrdersUrl,null).subscribe(orders=>{
      this.orders=orders;

    },error=>{
      this.toastr.error("Siparişler getirilirken bir hata meydana geldi...");
    },()=>{
      this.loading=false;
    });
  }

}
