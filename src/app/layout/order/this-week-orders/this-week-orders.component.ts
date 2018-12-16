import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { ToastsManager } from 'ng2-toastr';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-this-week-orders',
  templateUrl: './this-week-orders.component.html',
  styleUrls: ['./this-week-orders.component.scss']
})
export class ThisWeekOrdersComponent implements OnInit {

  config:IConfig;
  loading:boolean=true;
  orders:ReceivedOrder[]=[];
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private orderService:OrderService,private configService: ConfigService) 
    {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisWeekOrders();
  }
  getThisWeekOrders()
  {
    this.orderService.getThisWeekOrders(this.config.getThisWeekOrdersUrl,null).subscribe(orders=>{
      this.orders=orders;

    },error=>{
      this.toastr.error("Siparişler getirilirken bir hata meydana geldi...");
    },()=>{
      this.loading=false;
    });
  }

}
