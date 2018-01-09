import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { receivedOrder } from '../../shared/DTOs/receivedOrder';
import { customer } from '../../shared/DTOs/customer';
import { OrderService } from './order.service';
import { ConfigService, IConfig } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';




@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  config: IConfig;
  receivedOrders: receivedOrder[];
  currentCustomerOrders: receivedOrder;
  currentCustomer: customer;
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  isLoading: boolean = true;
  orderstatus: orderStatus;

  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   // this.orderstatus=orderStatus;
  }
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    let receivedOrder: any;

    receivedOrder.status = orderStatus.Waiting;
    this.getAllOrderByStatus(receivedOrder)
    // this.orderService.getAllOrders(this.currentCustomer).subscribe(response=>{
    //   this.currentCustomerOrders=response.json();
    //   this.isLoading=false;
    //   this.loading=false;
    //   console.log(this.currentCustomerOrders);
    // });
  }

  getAllOrderByStatus(receivedOrder): any {
    this.loading = true;

    this.orderService.getAllOrders(this.config.getAllOrderByStatusUrl, receivedOrder)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.receivedOrders = items;
          this.loading = false;
        }
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

  showOrderDetails(order: receivedOrder) {
    // Show order details using PrimeNG

    // this.dialog.open(OrderDetailsComponent, {
    //   width: '50%', data: { order: order }
    // });
  }

}
