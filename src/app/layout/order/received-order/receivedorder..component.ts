import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { IConfig, ConfigService } from '../../../app.config';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { Customer } from '../../../shared/DTOs/customer';
import { ReceivedOrderProduct } from '../../../shared/DTOs/receivedOrderProduct';
import { orderStatus } from '../orderStatus';
import { OrderService } from '../order.service';




@Component({
  selector: 'app-order',
  templateUrl: './receivedorder.component.html',
  // styleUrls: ['./order.component.scss']
})
export class ReceivedOrderComponent implements OnInit {
  config: IConfig;
  receivedOrders: ReceivedOrder[];
  receivedOrder: ReceivedOrder;
  currentCustomerOrders: ReceivedOrder;
  currentCustomer: Customer;
  loading: boolean = true;
  displayOrderDetails: boolean = false;
  orderDetails: ReceivedOrderProduct[];
  color = 'primary';
  mode = 'indeterminate';
  isLoading: boolean = true;
  orderstatus: orderStatus;

  constructor(private orderService: OrderService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.receivedOrder = new ReceivedOrder();
    this.orderDetails = new Array<ReceivedOrderProduct>();
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
  approveOrder(order){
    //OrderStatus=2  Approved
    order.orderStatus= orderStatus.Approved;
    this.loading = true; 

    this.orderService.getAllOrders(this.config.saveReceivedOrderUrl, order)
      .subscribe(items => { 
        this.loading = false;
        let order = new ReceivedOrder();
        this.toastr.success('Siparis Onaylanmistir.', 'Basarili!')
        order.orderStatus = orderStatus.Waiting;
        this.getAllOrderByStatus( this.receivedOrder);
      },
      error => this.toastr.error('Siparis Onaylanirken hata ile karsilasildi.', 'Error!'),
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
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

}
