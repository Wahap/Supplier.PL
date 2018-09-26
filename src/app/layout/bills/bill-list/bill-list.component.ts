import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Bill } from '../../../shared/DTOs/Bill';
import { Customer } from '../../../shared/DTOs/customer';
import { BillService } from '../bill.service';
import { CustomersService } from '../../customers/customers.service';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss']
})
export class BillListComponent implements OnInit {
  config: IConfig;
  loading:boolean=true;
  allBills:Bill[]=[];
  selectedBill:Bill;
  allCustomers:Customer[]=[];
  showPrintDialog:boolean=false;
  billListColumns:any[];
  constructor(private configService: ConfigService,private billService:BillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillAllBills();
    this.billListColumns = [
      { field: 'id', header: 'Irs.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      { field: 'address', header: 'Adres' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];
  }  

  fillAllBills()
  {
    this.billService.getAllBills(this.config.getAllBillsUrl,null).subscribe(bills=>{
      this.allBills=bills;
      this.loading=false;
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
    this.showPrintDialog = true;
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
