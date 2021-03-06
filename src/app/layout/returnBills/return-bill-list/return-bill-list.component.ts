import { Component, OnInit, Input } from '@angular/core';
import { ReturnBill } from '../../../shared/DTOs/returnBill';
import { ReturnBillService } from '../return-bill.service';
import { IConfig, ConfigService } from '../../../app.config';
import { PaymentType } from '../../../shared/DTOs/paymentType';
import { CommonService } from '../../../shared/common.service';
import { Payment } from '../../../shared/DTOs/payment';
import { Totals } from '../../../shared/DTOs/totals';

@Component({
  selector: 'app-return-bill-list',
  templateUrl: './return-bill-list.component.html',
  styleUrls: ['./return-bill-list.component.scss']
})
export class ReturnBillListComponent implements OnInit {
  billListColumns: any[];
  config: IConfig;
  @Input() allBills: ReturnBill[] = [];
  existsInputData: boolean = false;
  loading: boolean = true;
  selectedBill: ReturnBill;
  showUpdateBillDialog: boolean = false;
  showPrintDialog: boolean = false;

  selectedBillForPayment: ReturnBill;//
  paymentTypes: PaymentType[] = [];
  payment: Payment = new Payment();
  paymentTotals: Totals = new Totals();



  showPaymentDialog: boolean = false;

  constructor(private returnBillService: ReturnBillService, private configService: ConfigService, private commonService: CommonService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if (!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllBills();

    }
    else//Data coming from another component
    {
      this.loading = false;
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

    this.existsInputData = true;
  }

  onBillSaved(editedBill:ReturnBill)
  {
    let bill = this.allBills.find(x => x.id == editedBill.id);
    let cd=new Date(editedBill.createdDate);
    bill.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
    let dd=new Date(editedBill.deliveryDate);
    bill.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
    bill.customerId = editedBill.customerId;
    bill.extraDiscount = editedBill.extraDiscount;
    bill.addressId = editedBill.addressId;
    bill.deliveryAddressId = editedBill.deliveryAddressId;
    this.showUpdateBillDialog = false;
  }
  updateBill(bill: ReturnBill) {

    this.selectedBill = bill;
    this.showUpdateBillDialog = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{

    // });
  }
  fillAllBills() {
    this.returnBillService.getAllReturnBills(this.config.getAllReturnBillsUrl, null).subscribe(bills => {
      this.allBills = bills;
      this.loading = false;
    });
  }

  deleteBill(bill: ReturnBill) {



    if (confirm("Faturayı Silmek istediğinize emin misiniz?")) {
      this.loading = true;
      this.returnBillService.deleteReturnBill(this.config.deleteReturnBillUrl, bill).subscribe(result => {
        let indis = this.allBills.findIndex(returnBill => returnBill.id == bill.id);
        this.allBills.splice(indis, 1);
        this.loading = false;
      });
    }

  }
  onBillPreview(bill: ReturnBill) {
    this.selectedBill = bill;
    this.showPrintDialog = true;
  }
  onCloseNewBillDialog() {
    this.selectedBill = null;
  }

  openPaymentDialog(Returnbill) {
    this.selectedBillForPayment = Returnbill;
    this.showPaymentDialog = true;
    //get payment types
    if (this.paymentTypes.length < 1)//Just fill once
    {
      this.commonService.getAllPaymentTypes(this.config.getPaymentTypesUrl, null).subscribe(paymentTypes => {
        this.paymentTypes = paymentTypes;
      });
    }


    //get bill payments
    this.getReturnBillPayments(Returnbill);

  }

  getReturnBillPayments(Returnbill) {
    this.returnBillService.getReturnBillPayments(this.config.getReturnBillPaymentsUrl, Returnbill).subscribe((payments: Payment[]) => {
      this.selectedBillForPayment.payments = payments;
      this.paymentTotals = new Totals();//make all properties 0
      this.paymentTotals.totalItems = payments.length;
      payments.forEach(payment => {
        this.paymentTotals.totalGrossPrice += payment.amount;
      });
    });
  }

  savePayment() {
    this.payment.billId = this.selectedBillForPayment.id;
    this.payment.documentType = 3;
    this.returnBillService.savePayment(this.config.savePaymentUrl, this.payment).subscribe(response => {
      //refresh payments table
      this.payment = new Payment();//reset payment
      this.getReturnBillPayments(this.selectedBillForPayment);
    });

  }
  setPayment(payment:Payment)
  {
    this.payment=payment;//
    this.payment.paymentDate=new Date(payment.paymentDate);//Because p-calendar only supports Date Type
    
  }
  deletePayment(payment)
  {
    
  
      this.returnBillService.deletePayment(this.config.deletePaymentUrl,payment).subscribe(response=>{
        //refresh payments table
      this.getReturnBillPayments(this.selectedBillForPayment);
      this.payment=new Payment();
    
      });
    
  }


  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }

}
