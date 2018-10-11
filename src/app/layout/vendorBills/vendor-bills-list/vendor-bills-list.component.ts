import { Component, OnInit, Input } from '@angular/core';
import { ConfigService, IConfig } from '../../../app.config';
import { VendorBillService } from '../vendor-bill.service';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { Payment } from '../../../shared/DTOs/payment';
import { PaymentType } from '../../../shared/DTOs/paymentType';
import { CommonService } from '../../../shared/common.service';
import { Totals } from '../../../shared/DTOs/totals';

@Component({
  selector: 'app-vendor-bills-list',
  templateUrl: './vendor-bills-list.component.html',
  styleUrls: ['./vendor-bills-list.component.scss']
})
export class VendorBillsListComponent implements OnInit {
  config: IConfig;
  loading: boolean = true;
  billListColumns: any[];
  existsInputData: boolean = false;
  @Input() allBills: VendorBill[] = [];
  selectedBill: VendorBill;
  selectedBillForPayment: VendorBill;
  showUpdateBillDialog: boolean = false;
  showPrintDialog: boolean = false;
  showPaymentDialog: boolean = false;
  payment: Payment = new Payment();
  paymentTypes: PaymentType[] = [];
  paymentTotals:Totals=new Totals();
  constructor(private configService: ConfigService, private vendorBillService: VendorBillService, private commonService: CommonService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if (!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllVendorBills();

    }
    else//Data coming from another component
    {
      this.loading = false;
    }

    this.billListColumns = [
      { field: 'billNumber', header: 'Fatura.No' },
      { field: 'supplier', header: 'Toptancı' },
      { field: 'isPaid', header: 'Ödenme Durumu' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.existsInputData = true;

  }
  fillAllVendorBills() {
    this.vendorBillService.getAllVendorBills(this.config.getAllVendorBillsUrl, null).subscribe(bills => {
      this.allBills = bills;
      this.loading = false;
    });
  }
  onIsPaidChange(bill) {
    this.vendorBillService.saveVendorBill(this.config.saveVendorBillUrl, bill).subscribe(response => {


    });
  }
  deleteBill(bill: VendorBill) {



    if (confirm("Faturayı Silmek istediğinize emin misiniz?")) {
      this.loading = true;
      this.vendorBillService.deleteVendorBill(this.config.deleteVendorBillUrl, bill).subscribe(result => {
        this.fillAllVendorBills();
      });
    }

  }
  updateBill(bill: VendorBill) {

    this.selectedBill = bill;
    this.showUpdateBillDialog = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{

    // });
  }
  onBillPreview(bill: VendorBill) {
    this.selectedBill = bill;
    this.showPrintDialog = true;
  }
  onCloseNewBillDialog() {
    this.selectedBill = null;
  }

  openPaymentDialog(vendorbill) {
    this.selectedBillForPayment = vendorbill;
    this.showPaymentDialog = true;
    this.getVendorBillPayments(vendorbill);
    //get payment types
    if (this.paymentTypes.length < 1)//Just fill once
    {
      this.commonService.getAllPaymentTypes(this.config.getPaymentTypesUrl, null).subscribe(paymentTypes => {
        this.paymentTypes = paymentTypes;
      });
    }
  }
  setPayment(payment:Payment)
  {
    this.payment=payment;//
    this.payment.paymentDate=new Date(payment.paymentDate);//Because p-calendar only supports Date Type
    
  }

  deletePayment(payment)
{
  

    this.vendorBillService.deleteVendorBillPayment(this.config.deletePaymentUrl,payment).subscribe(response=>{
      //refresh payments table
    this.getVendorBillPayments(this.selectedBillForPayment);
    this.payment=new Payment();
  
    });
  
}
  savePayment()
{
  this.payment.billId=this.selectedBillForPayment.id;
  this.payment.documentType=2;
    this.vendorBillService.saveVendorBillPayment(this.config.savePaymentUrl,this.payment).subscribe(response=>{
      //refresh payments table
    this.payment=new Payment();//reset payment
      this.getVendorBillPayments(this.selectedBillForPayment);
    });
  
}

getVendorBillPayments(vendorbill)
{
  this.vendorBillService.getVendorBillPayments(this.config.getVendorBillPaymentsUrl,vendorbill).subscribe((payments:Payment[])=>{
    this.selectedBillForPayment.payments=payments;
    this.paymentTotals=new Totals();//make all properties 0
    this.paymentTotals.totalItems=payments.length;
    payments.forEach(payment=>{
      this.paymentTotals.totalGrossPrice+=payment.amount;
    });
  });
}
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.80 - 120) + "px";
  }
}
