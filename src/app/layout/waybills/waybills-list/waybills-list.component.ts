import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { MatDialog } from '@angular/material';
import { Bill } from '../../../shared/DTOs/Bill';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-waybills-list',
  templateUrl: './waybills-list.component.html',
  styleUrls: ['./waybills-list.component.scss']
})
export class WaybillsListComponent implements OnInit {
  config: IConfig;
  @Input() loading: boolean = true;
  @Input() allWaybills: Waybill[] = [];
  selectedWayBill: Waybill;
  printedWaybill:Waybill;
  allCustomers: Customer[] = [];
  dialogVisible: boolean = false;
  showPrintDialog: boolean = false;
  waybillListColumns: any[];
  existsInputData: boolean = false;
  isWaybillConverting: boolean = false;
  disabledButtons: boolean = false;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private configService: ConfigService, private waybillService: WaybillService, private customerService: CustomersService, public dialog: MatDialog, public router: Router) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    if (!this.existsInputData)//if this component not calling from other components
    {
      this.fillAllWaybills();
    }
    

    this.waybillListColumns = [
      { field: 'id', header: 'Irs.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      { field: 'address', header: 'Adres' },
      { field: 'update', header: 'Güncelle' },
      { field: 'convert', header: 'Dönüştür' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];

    // this.fillAllCustomers();
  }
  ngOnChanges(waybills): void {
    this.existsInputData = true;

    //this.allWaybills=waybills;


  }
  fillAllWaybills() {
    this.waybillService.getAllWaybills(this.config.getAllWaybillsUrl, null).subscribe(waybills => {
      this.allWaybills = waybills;
      console.log(waybills);
      this.loading = false;
    },error=>{
      this.toastr.error("irsaliyeler getirilirken bir hata meydana geldi...");
    });
  }

  fillAllCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(customers => {
      this.allCustomers = customers;

    },error=>{
      this.toastr.error("Müşteriler getirilirken bir hata meydana geldi...");
    });
  }

  deleteWaybill(waybill) {
    if (confirm("irsaliyeyi Silmek istediğinize Emin Misiniz?")) {
      this.disabledButtons = true;
      this.waybillService.deleteWaybill(this.config.deleteWaybillUrl, waybill).subscribe(result => {
        let indis=this.allWaybills.findIndex(x=>x.id==waybill.id);
        this.allWaybills.splice(indis,1);
        this.disabledButtons = false;
      });
    }

  }
  convertWaybillToBill(waybill: Waybill) {
    this.isWaybillConverting = true;
    this.disabledButtons = true;
    if (confirm("irsaliyeyi Faturaya Dönüştürülecek. Devam etmek istiyor musunuz?")) {
      this.waybillService.convertWaybillToBill(this.config.convertWaybillToBillUrl, waybill).subscribe((bill: Bill) => {
        waybill.convertedBillNumber = bill.billNumber;
        this.isWaybillConverting = false;
        this.disabledButtons = false;
      },error=>{
        this.toastr.error("irsaliye faturaya dönüştürülürken bir hata meydana geldi...");
      });
    }

  }
  onWaybillSaved(editedWaybill: Waybill) {
    let waybill = this.allWaybills.find(x => x.id == editedWaybill.id);
    waybill.createdDate = new Date(editedWaybill.createdDate);
    waybill.deliveryDate = new Date(editedWaybill.deliveryDate);
    waybill.customerId = editedWaybill.customerId;
    waybill.discountRateId = editedWaybill.discountRateId;
    waybill.extraDiscount = editedWaybill.extraDiscount;
    waybill.addressId = editedWaybill.addressId;
    waybill.deliveryAddressId = editedWaybill.deliveryAddressId;
    waybill.convertedBillNumber=editedWaybill.convertedBillNumber;
    this.dialogVisible = false;
  }
  updateWaybill(waybill: Waybill) {

    this.selectedWayBill = waybill;
    this.dialogVisible = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{

    // });
  }
  onWaybillPreview(waybill: Waybill) {
    this.printedWaybill = waybill;
    this.showPrintDialog = true;
  }
  onCloseNewWaybillDialog() {
    this.selectedWayBill = null;
  }

  windowsHeight() {
    return (window.innerHeight) + "px";
  }
  windowsWidth() {
    return (window.screen.width * 0.85 - 120) + "px";
  }

}
