import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { IConfig, ConfigService } from '../../../app.config';
import { Totals } from '../../../shared/DTOs/totals';
import { BillService } from '../bill.service';
import { BillProduct } from '../../../shared/DTOs/billProduct';

@Component({
  selector: 'app-bill-print',
  templateUrl: './bill-print.component.html',
  styleUrls: ['./bill-print.component.scss']
})
export class BillPrintComponent implements OnInit {
  @Input() selectedBill:Bill;
  config: IConfig;
  billTotals:Totals;
  lastPaymentDate:Date;

  
  constructor(private configService: ConfigService,private billService:BillService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.billTotals=new Totals();
  }

  ngOnChanges()
  {
    console.log(this.selectedBill);
    if(this.selectedBill!=null)
    {
      this.lastPaymentDate = new Date(this.selectedBill.createdDate);
      this.lastPaymentDate.setDate( this.lastPaymentDate.getDate() + this.selectedBill.discountRate.validDaysNumber );
      this.setBillProducts();
     // this.lastPaymentDate=this.selectedBill.createdDate.setDate(this.selectedBill.createdDate.getDate()+14);
    }
   
  }

  setBillProducts()
  {
    this.billService.getBillProducts(this.config.getBillProductsUrl,this.selectedBill).subscribe(billProducts=>{
      
      this.selectedBill.billProducts=billProducts;
      this.calculateBillPrices();
    });
  }

  calculateBillPrices()
  {
    this.billTotals=new Totals();
    this.selectedBill.billProducts.forEach((pro:BillProduct)=>{
      let numberOfPieces=pro.numberOfPackage*pro.product.unitsInPackage;
      this.billTotals.totalPackages+=pro.numberOfPackage;
      this.billTotals.totalPieces+=numberOfPieces;
      this.billTotals.subNetTotalPrice+=numberOfPieces*pro.netSalePrice;
     
    });
    this.billTotals.extraDiscount=(this.billTotals.subNetTotalPrice)*this.selectedBill.extraDiscount/100;
    this.billTotals.totalNetPrice=this.billTotals.subNetTotalPrice-this.billTotals.extraDiscount;
    this.billTotals.totalTaxPrice=this.billTotals.totalNetPrice*0.07;
    this.billTotals.subGrossTotalPrice=this.billTotals.totalNetPrice+this.billTotals.totalTaxPrice;
    this.billTotals.discount=(this.billTotals.subGrossTotalPrice)*this.selectedBill.discountRate.rate/100;
    this.billTotals.totalGrossPrice=this.billTotals.subGrossTotalPrice-this.billTotals.discount;
   
     this.billTotals.totalItems=this.selectedBill.billProducts.length;
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
