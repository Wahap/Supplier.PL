import { Component, OnInit,Input } from '@angular/core';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { ConfigService, IConfig } from '../../../app.config';
import { Totals } from '../../../shared/DTOs/totals';
import { WaybillProduct } from '../../../shared/DTOs/waybillProduct';

@Component({
  selector: 'app-waybill-print',
  templateUrl: './waybill-print.component.html',
  styleUrls: ['./waybill-print.component.scss']
})
export class WaybillPrintComponent implements OnInit {
  @Input() selectedWaybill:Waybill;
  config: IConfig;
  waybillTotals:Totals;
  printPrices:boolean=false;
  constructor(private configService: ConfigService,private waybillService:WaybillService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.waybillTotals=new Totals();
  }

  ngOnChanges()
  {
    if(this.selectedWaybill!=null)
    {
      
      this.setWaybillProducts();
    }
   
  }

  setWaybillProducts()
  {
    this.waybillService.getWaybillProducts(this.config.getWaybillProductsUrl,this.selectedWaybill).subscribe(waybillProducts=>{
      
      this.selectedWaybill.waybillProducts=waybillProducts;
      this.calculateWaybillPrices();
      console.log(this.selectedWaybill);
    });
  }

  calculateWaybillPrices()
  {
    this.waybillTotals=new Totals();
    this.selectedWaybill.waybillProducts.forEach((pro:WaybillProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.waybillTotals.totalPackages+=pro.numberOfPackage;
      this.waybillTotals.totalPieces+=numberOfPieces;
      this.waybillTotals.totalNetPrice+=numberOfPieces*pro.netSalePrice;
      this.waybillTotals.totalTaxPrice+=numberOfPieces*(pro.netSalePrice*pro.tax/100);
      this.waybillTotals.extraDiscount=(this.waybillTotals.totalNetPrice+this.waybillTotals.totalTaxPrice)*this.selectedWaybill.extraDiscount/100;
      this.waybillTotals.discount=(this.waybillTotals.totalNetPrice+this.waybillTotals.totalTaxPrice)*this.selectedWaybill.discountRate.rate/100;
      this.waybillTotals.totalGrossPrice=this.waybillTotals.totalNetPrice+this.waybillTotals.totalTaxPrice-this.waybillTotals.extraDiscount-this.waybillTotals.discount;
    });
    this.waybillTotals.totalItems=this.selectedWaybill.waybillProducts.length;
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
