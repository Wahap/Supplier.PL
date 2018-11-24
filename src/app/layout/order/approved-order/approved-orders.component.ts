import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { ReceivedOrderProduct } from '../../../shared/DTOs/receivedOrderProduct';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { Customer } from '../../../shared/DTOs/customer';
import { orderStatus } from '../orderStatus';
import { OrderService } from '../order.service';
import { IConfig, ConfigService } from '../../../app.config';

@Component({
  selector: 'app-approved-orders',
  templateUrl: './approved-orders.component.html',
  styleUrls: ['./approved-orders.component.scss']
})
export class ApprovedOrdersComponent implements OnInit {
  initialCount: number = 10;
  config: IConfig;
  approvedOrders: ReceivedOrder[];
  approvedOrder:ReceivedOrder;
  currentCustomerOrders: ReceivedOrder;
  currentCustomer: Customer;
  displayOrderDetails: boolean = false;
  orderDetails: ReceivedOrderProduct[];
  loading: boolean = true;
  color = 'primary';
  mode = 'indeterminate';
  isLoading: boolean = true;
  orderstatus: orderStatus;
  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.approvedOrder=new ReceivedOrder();
   // this.orderstatus=orderStatus;
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();

    this.approvedOrder.orderStatus= orderStatus.Approved;
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
  showOrderDetails(orderDetail: ReceivedOrder) {
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
