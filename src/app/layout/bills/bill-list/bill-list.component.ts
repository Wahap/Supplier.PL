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
this.showPaymentDialog=true;
//get payment types
this.commonService.getAllPaymentTypes("define getallpayments url in app.cofig",null).subscribe(paymentTypes=>{
  this.paymentTypes=paymentTypes;
});

//get bill payments
this.billService.getBillPayments("define getBillPayments url in app.cofig",bill).subscribe(payments=>{
  this.selectedBill.payments=payments;
});

}
setPayment(payment)
{
  this.payment=payment;
}
savePayment()
{
  
    this.billService.savePayment("define savePayment url in app.cofig",this.payment).subscribe(response=>{
      //refresh payments table
    this.payment=new Payment();//reset payment
  
    });
  
}
deletePayment(payment)
{
  
    this.billService.deletePayment("define deletePayment url in app.cofig",this.payment).subscribe(response=>{
      //refresh payments table
    
  
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
