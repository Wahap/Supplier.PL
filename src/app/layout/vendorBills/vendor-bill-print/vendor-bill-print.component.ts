import { Component, OnInit, Input } from '@angular/core';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { IConfig, ConfigService } from '../../../app.config';
import { Totals } from '../../../shared/DTOs/totals';
import { VendorBillService } from '../vendor-bill.service';
import { VendorBillProduct } from '../../../shared/DTOs/vendorBillProduct';

@Component({
  selector: 'app-vendor-bill-print',
  templateUrl: './vendor-bill-print.component.html',
  styleUrls: ['./vendor-bill-print.component.scss']
})
export class VendorBillPrintComponent implements OnInit {

  @Input() selectedBill:VendorBill;
  config: IConfig;
  billTotals:Totals;

  
  constructor(private configService: ConfigService,private vendorBillService:VendorBillService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.billTotals=new Totals();
  }

  ngOnChanges()
  {
    console.log(this.selectedBill);
    if(this.selectedBill!=null)
    {
    
      this.setBillProducts();
     // this.lastPaymentDate=this.selectedBill.createdDate.setDate(this.selectedBill.createdDate.getDate()+14);
    }
   
  }

  setBillProducts()
  {
    this.vendorBillService.getVendorBillProducts(this.config.getVendorBillProductsUrl,this.selectedBill).subscribe(billProducts=>{
      
      this.selectedBill.vendorBillProducts=billProducts;
      this.calculateBillPrices();
    });
  }

  calculateBillPrices()
  {
    this.billTotals=new Totals();
    this.selectedBill.vendorBillProducts.forEach((pro:VendorBillProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.billTotals.totalPackages+=pro.numberOfPackage;
      this.billTotals.totalPieces+=numberOfPieces;
      this.billTotals.totalPurchasePrice+=numberOfPieces*pro.purchasePrice;
      this.billTotals.totalTaxPrice+=numberOfPieces*(pro.purchasePrice*pro.tax/100);
  
      this.billTotals.totalGrossPrice=this.billTotals.totalPurchasePrice+this.billTotals.totalTaxPrice;
    });
    this.billTotals.totalItems=this.selectedBill.vendorBillProducts.length;
  }
  printPage()
  {
    var mywindow = window.open('', 'fatura yazdır', 'height='+window.outerHeight+',width='+window.outerWidth);
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write(`<style>
    body{ font-family: Arial, Helvetica, sans-serif; }
    @page
    {
      margin-top:200px;
      margin-bottom:100px;
    }
    </style>
    
    `);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.querySelector("#all-page").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    setTimeout(function(){mywindow.print();},1000);
  }

}
