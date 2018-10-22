import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { ConfigService, IConfig } from '../../../app.config';
import { BillService } from '../bill.service';
import { Totals } from '../../../shared/DTOs/totals';
import { BillProduct } from '../../../shared/DTOs/billProduct';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-analyze-bill',
  templateUrl: './analyze-bill.component.html',
  styleUrls: ['./analyze-bill.component.scss']
})
export class AnalyzeBillComponent implements OnInit {
@Input("bill") bill:Bill;
config:IConfig;
billTotals:Totals=new Totals();
billData:any;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private configService:ConfigService,private billService:BillService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
  }

  ngOnChanges() {
   
    if(this.bill!=undefined)
    {
     this.setBillProducts();
    }
  }

  setBillProducts()
  {
    this.billService.getBillProducts(this.config.getBillProductsUrl,this.bill).subscribe(billProducts=>{
      this.bill.billProducts=billProducts;
      console.log(this.bill);
      this.calculateBillPrices();
    },error=>{
      this.toastr.error("Faturanın Ürünleri Getirilirken Bir Hata Meydana Geldi...");
    });
  }

  calculateBillPrices()
  {
    this.billTotals=new Totals();
    this.bill.billProducts.forEach((pro:BillProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.billTotals.totalPackages+=pro.numberOfPackage;
      this.billTotals.totalPieces+=numberOfPieces;
      this.billTotals.totalNetPrice+=numberOfPieces*pro.netSalePrice;
      this.billTotals.totalPurchasePrice+=numberOfPieces*pro.purchasePrice;
      this.billTotals.totalTaxPrice+=numberOfPieces*(pro.netSalePrice*pro.tax/100);
      this.billTotals.extraDiscount=(this.billTotals.totalNetPrice+this.billTotals.totalTaxPrice)*this.bill.extraDiscount/100;
      this.billTotals.discount=(this.billTotals.totalNetPrice+this.billTotals.totalTaxPrice)*this.bill.discountRate.rate/100;
      this.billTotals.totalGrossPrice=this.billTotals.totalNetPrice+this.billTotals.totalTaxPrice-this.billTotals.extraDiscount-this.billTotals.discount;
    });
    this.billTotals.totalItems=this.bill.billProducts.length;

    this.billData = {
      labels: ['Toplam Alış Fiyatı','Toplam Satış Fiyatı'],
      datasets: [
          {
              data: [this.billTotals.totalPurchasePrice.toFixed(2), this.billTotals.totalNetPrice.toFixed(2)],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]    
      };
  }

}
