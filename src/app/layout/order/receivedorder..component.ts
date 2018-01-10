import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { receivedOrder } from '../../shared/DTOs/receivedOrder';
import { customer } from '../../shared/DTOs/customer';
import { OrderService } from './order.service';
import { ConfigService, IConfig } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { orderStatus } from './orderStatus';
import { receivedOrderProduct } from '../../shared/DTOs/receivedOrderProduct';




@Component({
  selector: 'app-order',
  templateUrl: './receivedorder.component.html',
  // styleUrls: ['./order.component.scss']
})
export class ReceivedOrderComponent implements OnInit {
  config: IConfig;
  receivedOrders: receivedOrder[];
  receivedOrder: receivedOrder;
  currentCustomerOrders: receivedOrder;
  currentCustomer: customer;
  loading: boolean = true;
  displayOrderDetails: boolean = false;
  orderDetails: receivedOrderProduct[];
  color = 'primary';
  mode = 'indeterminate';
  isLoading: boolean = true;
  orderstatus: orderStatus;

  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.receivedOrder = new receivedOrder();
    this.orderDetails = new Array<receivedOrderProduct>();
    // this.orderstatus=orderStatus;
  }
  ngOnInit() {
    this.config = this.configService.getAppConfig();

    this.receivedOrder.orderStatus = orderStatus.Waiting;
    this.getAllOrderByStatus(this.receivedOrder)

  }

  getAllOrderByStatus(receivedOrder): any {
    this.loading = true;

    this.orderService.getAllOrders(this.config.getAllOrderByStatusUrl, receivedOrder)
      .subscribe(items => {
        this.receivedOrders = items;
        this.loading = false;
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
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

}
