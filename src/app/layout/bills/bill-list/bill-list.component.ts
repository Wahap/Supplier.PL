import { Component, OnInit,Input, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Bill } from '../../../shared/DTOs/Bill';
import { Customer } from '../../../shared/DTOs/customer';
import { BillService } from '../bill.service';
import { CustomersService } from '../../customers/customers.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { Payment } from '../../../shared/DTOs/payment';
import { CommonService } from '../../../shared/common.service';
import { PaymentType } from '../../../shared/DTOs/paymentType';
import { Totals } from '../../../shared/DTOs/totals';
import { ToastsManager } from 'ng2-toastr';
 
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  config: IConfig;
  @Input() loading:boolean=true;
  @Input() allBills:Bill[]=[];  
  selectedBill:Bill;
  printedBill:Bill;
  allCustomers:Customer[]=[];
  showPrintDialog:boolean=false;
  showPaymentDialog:boolean=false;
  showUpdateBillDialog:boolean=false;
  billListColumns:any[];
  existsInputData:boolean=false;
  payment:Payment=new Payment();
  paymentTypes:PaymentType[]=[];  
  paymentTotals:Totals=new Totals();
  today:Date=new Date();
  selectedAnalyzedBill:Bill;//
  selectedBillForPayment:Bill;//
  showAnalyzedBillDialog:boolean=false;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private configService: ConfigService,private commonService:CommonService, private billService:BillService,private customerService:CustomersService,public dialog: MatDialog) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if(!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllBills();

    }
   
    
    this.billListColumns = [   
      { field: 'billNumber', header: 'Fatura.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'grossPrice', header: 'Brüt' },
      { field: 'isPaid', header: 'Ödenme Durumu' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];
  }  
ngOnChanges() {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.existsInputData=true;
  
}
openPaymentDialog(bill)
{
  this.selectedBillForPayment=bill;
  this.payment=new Payment();//reset payment
this.showPaymentDialog=true;
//get payment types
if(this.paymentTypes.length<1)//Just fill once
{
  this.commonService.getAllPaymentTypes(this.config.getPaymentTypesUrl,null).subscribe(paymentTypes=>{
    this.paymentTypes=paymentTypes;
  },error=>{
    this.toastr.error("Ödeme Tipleri Getirilirken Bir Hata Meydana Geldi...");
  });
}


//get bill payments
this.getBillPayments(bill);

}
setPayment(payment:Payment)
{
  this.payment=payment;//
  this.payment.paymentDate=new Date(payment.paymentDate);//Because p-calendar only supports Date Type
  
}
getBillPayments(bill)
{
  this.billService.getBillPayments(this.config.getBillPaymentsUrl,bill).subscribe((payments:Payment[])=>{
    this.selectedBillForPayment.payments=payments;
    this.paymentTotals=new Totals();//make all properties 0
    this.paymentTotals.totalItems=payments.length;
    payments.forEach(payment=>{
      this.paymentTotals.totalGrossPrice+=payment.amount;
    });
  },error=>{
    this.toastr.error("Faturanın Ödemeleri Getirilirken Bir Hata Meydana Geldi...");
  });
}
savePayment()
{
  this.payment.billId=this.selectedBillForPayment.id;
  this.payment.documentType=1;
    this.billService.savePayment(this.config.savePaymentUrl,this.payment).subscribe(response=>{
      //refresh payments table
    this.payment=new Payment();//reset payment
      this.getBillPayments(this.selectedBillForPayment);
    });
  
}
deletePayment(payment)
{
  

    this.billService.deletePayment(this.config.deletePaymentUrl,payment).subscribe(response=>{
      //refresh payments table
    this.getBillPayments(this.selectedBillForPayment);
    this.payment=new Payment();
  
    },error=>{
      this.toastr.error("Ödeme Silinirken Bir Hata Meydana Geldi...");
    });
  
}
  fillAllBills()
  {
    this.billService.getAllBills(this.config.getAllBillsUrl,null).subscribe(bills=>{
      this.allBills=bills;
      this.loading=false;
    },error=>{
      this.toastr.error("Fatura Ödemeleri Getirilirken Bir Hata Meydana Geldi...");
    });
  }
  onIsPaidChange(bill)
  {
    this.billService.saveBill(this.config.saveBillUrl,bill).subscribe(response=>{


    },error=>{
      this.toastr.error("Ödeme Durumu Değiştirilirken Bir Hata Meydana Geldi...");
    });
  }
  deleteBill(bill:Bill)
  {

     if(confirm("Faturayı Silmek istediğinize emin misiniz?"))
     {
       this.loading=true;
      this.billService.deleteBill(this.config.deleteBillUrl,bill).subscribe(result=>{
        let indis=this.allBills.findIndex(x=>x.id==bill.id);
        this.allBills.splice(indis,1);
      },error=>{
        this.toastr.error("Fatura Silinirken Bir Hata Meydana Geldi...");
      });
     }
    
  }

  updateBill(bill:Bill)
  {
    
    this.selectedBill=bill;
    this.showUpdateBillDialog = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }
  analyzeBill(bill)
  {
    this.showAnalyzedBillDialog=true;
    this.selectedAnalyzedBill=bill;
  }
  onCloseNewBillDialog()
  {
    this.selectedBill=null;
  }
  onBillPreview(bill:Bill)
  {
    this.printedBill=bill;
this.showPrintDialog=true;
  }
  onBillSaved(editedBill:Bill)
  {
    let bill = this.allBills.find(x => x.id == editedBill.id);
    let cd=new Date(editedBill.createdDate);
    bill.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
    let dd=new Date(editedBill.deliveryDate);
    bill.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
    bill.customerId = editedBill.customerId;
    bill.discountRateId = editedBill.discountRateId;
    bill.discountRate=editedBill.discountRate; 
    bill.extraDiscount = editedBill.extraDiscount;
    bill.addressId = editedBill.addressId;
    bill.deliveryAddressId = editedBill.deliveryAddressId;
    bill.waybillId=editedBill.waybillId;
    bill.grossPrice=editedBill.grossPrice;
    

    this.showUpdateBillDialog = false;
  }
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.80 - 120) + "px";
  }

}
