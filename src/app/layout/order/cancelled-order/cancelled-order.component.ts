import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { receivedOrder } from '../../../shared/DTOs/receivedOrder';
import { orderStatus } from '../orderStatus';
import { OrderService } from '../order.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { receivedOrderProduct } from '../../../shared/DTOs/receivedOrderProduct';
import { customer } from '../../../shared/DTOs/customer';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.scss']
})
export class CancelledOrderComponent implements OnInit {
  initialCount: number = 10;
  config: IConfig;
  approvedOrders: receivedOrder[];
  approvedOrder:receivedOrder;
  currentCustomerOrders: receivedOrder;
  currentCustomer: customer;
  displayOrderDetails: boolean = false;
  orderDetails: receivedOrderProduct[];
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  isLoading: boolean = true;
  orderstatus: orderStatus;
  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.approvedOrder=new receivedOrder();
   // this.orderstatus=orderStatus;
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();

    this.approvedOrder.orderStatus= orderStatus.Cancelled;
    this.getAllOrderByStatus(this.approvedOrder)

  }
  getAllOrderByStatus(receivedOrder): any {
    this.loading = true;

    this.orderService.getAllOrders(this.config.getAllOrderByStatusUrl, receivedOrder)
      .subscribe(items => {
    //    if (items != null && items.length != 0) {
          this.approvedOrders = items;
          this.loading = false;
    //    }
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }
  showOrderDetails(orderDetail: receivedOrder) {
    // Show order details using PrimeNG
    this.loading = true;
    this.displayOrderDetails = true;
    this.orderService.getAllOrderDetails(this.config.getOrderDetails, orderDetail)
    .subscribe(items => {
        this.orderDetails = items;
        this.loading = false;
        return this.orderDetails;
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }


}
