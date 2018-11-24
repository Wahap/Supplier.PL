import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { ConfigService, IConfig } from '../../../app.config';
import { OrderService } from '../order.service';
import { CustomersService } from '../../customers/customers.service';
import { Router } from '@angular/router';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { Customer } from '../../../shared/DTOs/customer';
import { Waybill } from '../../../shared/DTOs/wayBill';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  config: IConfig;
  @Input() loading: boolean = true;
  @Input() allOrders: ReceivedOrder[] = [];
  selectedOrder: ReceivedOrder;
  printedOrder:ReceivedOrder;
  allCustomers: Customer[] = [];
  dialogVisible: boolean = false;
  showPrintDialog: boolean = false;
  orderListColumns: any[];
  existsInputData: boolean = false;
  isOrderConverting: boolean = false;
  disabledButtons: boolean = false;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private configService: ConfigService, private orderService: OrderService, private customerService: CustomersService,  public router: Router) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if (!this.existsInputData)//if this component not calling from other components
    {
      this.fillOrders();
    }
    

    this.orderListColumns = [
      { field: 'id', header: 'Sipariş No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      { field: 'address', header: 'Adres' },
      { field: 'update', header: 'Güncelle' },
      { field: 'convert', header: 'Dönüştür' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];

    // this.fillAllCustomers();
  }
  ngOnChanges(waybills): void {
    this.existsInputData = true;

    //this.allWaybills=waybills;


  }

  fillOrders() {
    this.orderService.getAllOrders(this.config.getAllReceivedOrdersUrl, null).subscribe(orders => {
      this.allOrders = orders;
      console.log(orders);
      this.loading = false;
    },error=>{
      this.toastr.error("Siparişler getirilirken bir hata meydana geldi...");
    });
  }
  onOrderSaved(editedOrder: ReceivedOrder) {
    let order = this.allOrders.find(x => x.id == editedOrder.id);
    let cd=new Date(editedOrder.createdDate);
    order.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
    let dd=new Date(editedOrder.deliveryDate);
    order.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
    order.customerId = editedOrder.customerId;
    order.discountRateId = editedOrder.discountRateId;
    order.extraDiscount = editedOrder.extraDiscount;
    order.addressId = editedOrder.addressId;
    order.deliveryAddressId = editedOrder.deliveryAddressId;
    order.convertedWaybillId=editedOrder.convertedWaybillId;
    this.dialogVisible = false;
  }
  updateOrder(order: ReceivedOrder) {

    this.selectedOrder = order;
    this.dialogVisible = true;

  }
  deleteOrder(order) {
    if (confirm("Siparişi Silmek istediğinize Emin Misiniz?")) {
      this.disabledButtons = true;
      this.orderService.deleteOrder(this.config.deleteReceivedOrderUrl, order).subscribe(result => {
        let indis=this.allOrders.findIndex(x=>x.id==order.id);
        this.allOrders.splice(indis,1);
        this.disabledButtons = false;
      },error=>{
        this.toastr.error("Sipariş silinirken bir hata oluştu");
      });
    }

  }
  convertOrderToWaybill(order: ReceivedOrder) {
   
    if (confirm("Sipariş irsaliyeye Dönüştürülecek. Devam etmek istiyor musunuz?")) {
      this.isOrderConverting = true;
      this.disabledButtons = true;
      this.orderService.convertOrderToWaybill(this.config.convertOrderToWaybillUrl, order).subscribe((waybill: Waybill) => {
        order.convertedWaybillId = waybill.id;
        this.isOrderConverting = false;
        this.disabledButtons = false;
      },error=>{
        this.toastr.error("irsaliye faturaya dönüştürülürken bir hata meydana geldi...");
      });
    }

  }
  onOrderPreview(order: ReceivedOrder) {
    this.printedOrder = order;
    this.showPrintDialog = true;
  }
  onCloseSaveOrderDialog() {
    this.selectedOrder = null;
  }
  windowsHeight() {
    return (window.innerHeight) + "px";
  }

}
