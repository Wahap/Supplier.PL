import { Component, OnInit, Input } from '@angular/core';
import { ReturnBill } from '../../../shared/DTOs/returnBill';
import { IConfig, ConfigService } from '../../../app.config';
import { Totals } from '../../../shared/DTOs/totals';
import { ReturnBillService } from '../return-bill.service';
import { ReturnBillProduct } from '../../../shared/DTOs/returnBillProduct';

@Component({
  selector: 'app-return-bill-print',
  templateUrl: './return-bill-print.component.html',
  styleUrls: ['./return-bill-print.component.scss']
})
export class ReturnBillPrintComponent implements OnInit {

  @Input() selectedBill:ReturnBill;
  config: IConfig;
  billTotals:Totals;
  lastPaymentDate:Date;

  
  constructor(private configService: ConfigService,private returnBillService:ReturnBillService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.billTotals=new Totals();
  }

  ngOnChanges()
  {
    
    if(this.selectedBill!=null)
    {
      this.lastPaymentDate = new Date(this.selectedBill.createdDate);
      this.lastPaymentDate.setDate( this.lastPaymentDate.getDate());
      this.setBillProducts();
     // this.lastPaymentDate=this.selectedBill.createdDate.setDate(this.selectedBill.createdDate.getDate()+14);
    }
   
  }

  setBillProducts()
  {
    this.returnBillService.getReturnBillProducts(this.config.getReturnBillProductsUrl,this.selectedBill).subscribe(billProducts=>{
      
      this.selectedBill.returnBillProducts=billProducts;
      this.calculateBillPrices();
    });
  }

  calculateBillPrices()
  {
    this.billTotals=new Totals();
    this.selectedBill.returnBillProducts.forEach((pro:ReturnBillProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.billTotals.totalPackages+=pro.numberOfPackage;
      this.billTotals.totalPieces+=numberOfPieces;
      this.billTotals.subNetTotalPrice+=numberOfPieces*pro.netSalePrice;
     
    });
    this.billTotals.extraDiscount=(this.billTotals.subNetTotalPrice)*this.selectedBill.extraDiscount/100;
    this.billTotals.totalNetPrice=this.billTotals.subNetTotalPrice-this.billTotals.extraDiscount;
    this.billTotals.totalTaxPrice=this.billTotals.totalNetPrice*0.07;
    this.billTotals.subGrossTotalPrice=this.billTotals.totalNetPrice+this.billTotals.totalTaxPrice;
    this.billTotals.totalGrossPrice=this.billTotals.subGrossTotalPrice+this.billTotals.discount;
   
     this.billTotals.totalItems=this.selectedBill.returnBillProducts.length;
  }
  printPage()
  {
    var mywindow = window.open('', '_blank');
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write(`<style>
    body{ font-family: Arial, Helvetica, sans-serif; }
    @page
    {
      margin-top:45mm;
      margin-bottom:35mm;
      margin-left:18mm;
      margin-right:18mm;
      
    }
    </style>
    
    `);
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.querySelector("#all-page").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
  }

}
