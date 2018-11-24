import { Component, OnInit, Input } from '@angular/core';
import { ReceivedOrder } from '../../../shared/DTOs/receivedOrder';
import { IConfig, ConfigService } from '../../../app.config';
import { Totals } from '../../../shared/DTOs/totals';
import { OrderService } from '../order.service';
import { ReceivedOrderProduct } from '../../../shared/DTOs/receivedOrderProduct';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.scss']
})
export class OrderPrintComponent implements OnInit {

  @Input() selectedOrder:ReceivedOrder;
  config: IConfig;
  orderTotals:Totals;
  printPrices:boolean=false;
  constructor(private configService: ConfigService,private orderService:OrderService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.orderTotals=new Totals();
  }

  ngOnChanges()
  {
    if(this.selectedOrder!=null)
    {
      
      this.setOrderProducts();
    }
   
  }

  setOrderProducts()
  {
    this.orderService.getReceivedOrderProducts(this.config.getReceivedOrderProductsUrl,this.selectedOrder).subscribe(orderProducts=>{
      
      this.selectedOrder.receivedOrderProducts=orderProducts;
      this.calculateOrderPrices();
    });
  }

  calculateOrderPrices()
  {
    this.orderTotals=new Totals();
    this.selectedOrder.receivedOrderProducts.forEach((pro:ReceivedOrderProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.orderTotals.totalPackages+=pro.numberOfPackage;
      this.orderTotals.totalPieces+=numberOfPieces;
      this.orderTotals.subNetTotalPrice+=numberOfPieces*pro.netSalePrice;
     
    });
    this.orderTotals.extraDiscount=(this.orderTotals.subNetTotalPrice)*this.selectedOrder.extraDiscount/100;
    this.orderTotals.totalNetPrice=this.orderTotals.subNetTotalPrice-this.orderTotals.extraDiscount;
    this.orderTotals.totalTaxPrice=this.orderTotals.totalNetPrice*0.07;
    this.orderTotals.subGrossTotalPrice=this.orderTotals.totalNetPrice+this.orderTotals.totalTaxPrice;
    this.orderTotals.discount=(this.orderTotals.subGrossTotalPrice)*this.selectedOrder.discountRate.rate/100;
    this.orderTotals.totalGrossPrice=this.orderTotals.subGrossTotalPrice-this.orderTotals.discount;
   
    // this.orderTotals.totalItems=this.selectedBill.billProducts.length;
  }
  printPage()
  {
    var mywindow = window.open('', '_blank');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<style>body{ font-family: Arial, Helvetica, sans-serif; }</style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.querySelector("#all-page").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
  //   var win = window.open('http://google.com', '_blank');
  // win.focus();
  }

}
