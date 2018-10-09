import { Component, OnInit,Input } from '@angular/core';
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
 
@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  config: IConfig;
  loading:boolean=true;
  @Input() allBills:Bill[]=[];
  selectedBill:Bill;
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
  showAnalyzedBillDialog:boolean=false;
  constructor(private configService: ConfigService,private commonService:CommonService, private billService:BillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if(!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllBills();

    }
    else//Data coming from another component
    {
this.loading=false;
    }
    
    this.billListColumns = [   
      { field: 'billNumber', header: 'Fatura.No' },
      { field: 'companyName', header: 'Firma' },
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
  this.selectedBill=bill;
this.showPaymentDialog=true;
//get payment types
if(this.paymentTypes.length<1)//Just fill once
{
  this.commonService.getAllPaymentTypes(this.config.getPaymentTypesUrl,null).subscribe(paymentTypes=>{
    this.paymentTypes=paymentTypes;
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
    this.selectedBill.payments=payments;
    this.paymentTotals=new Totals();//make all properties 0
    this.paymentTotals.totalItems=payments.length;
    payments.forEach(payment=>{
      this.paymentTotals.totalGrossPrice+=payment.amount;
    });
  });
}
savePayment()
{
  this.payment.billId=this.selectedBill.id;
    this.billService.savePayment(this.config.savePaymentUrl,this.payment).subscribe(response=>{
      //refresh payments table
    this.payment=new Payment();//reset payment
      this.getBillPayments(this.selectedBill);
    });
  
}
deletePayment(payment)
{
  

    this.billService.deletePayment(this.config.deletePaymentUrl,payment).subscribe(response=>{
      //refresh payments table
    this.getBillPayments(this.selectedBill);
    this.payment=new Payment();
  
    });
  
}
  fillAllBills()
  {
    this.billService.getAllBills(this.config.getAllBillsUrl,null).subscribe(bills=>{
      this.allBills=bills;
      this.loading=false;
    });
  }
  onIsPaidChange(bill)
  {
    this.billService.saveBill(this.config.saveBillUrl,bill).subscribe(response=>{


    });
  }
  deleteBill(bill:Bill)
  {
   
    
    
     if(confirm("Faturayı Silmek istediğinize emin misiniz?"))
     {
       this.loading=true;
      this.billService.deleteBill(this.config.deleteBillUrl,bill).subscribe(result=>{
        this.fillAllBills();
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
    this.selectedBill=bill;
this.showPrintDialog=true;
  }
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.80 - 120) + "px";
  }

}
