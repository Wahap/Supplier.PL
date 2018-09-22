import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-waybills-list',  
  templateUrl: './waybills-list.component.html',
  styleUrls: ['./waybills-list.component.scss']
})
export class WaybillsListComponent implements OnInit {
  config: IConfig;
  loading:boolean=true;
  allWaybills:Waybill[]=[];
  selectedWayBill:Waybill;
  allCustomers:Customer[]=[];
  dialogVisible:boolean=false;
  waybillListColumns:any[];
  constructor(private configService: ConfigService,private waybillService:WaybillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillAllWaybills();
    this.waybillListColumns = [
      { field: 'id', header: 'Irs.No' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      { field: 'address', header: 'Adres' },
      { field: 'update', header: 'Güncelle' },
      { field: 'print', header: 'Yazdır' },
      { field: 'delete', header: 'Sil' }
    ];

   // this.fillAllCustomers();
  }

  fillAllWaybills()
  {
    this.waybillService.getAllWaybills(this.config.getAllWaybillsUrl,null).subscribe(waybills=>{
      this.allWaybills=waybills;
      this.loading=false;
    });
  }

  fillAllCustomers()
  {
    this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(customers=>{
      this.allCustomers=customers;
      
    });
  }

  deleteWaybill(waybill)
  {
   
  
   
     if(confirm("irsaliyeyi Silmek istediğinize Emin Misiniz?"))
     {
      this.waybillService.deleteWaybill(this.config.deleteWaybillUrl,waybill).subscribe(result=>{
        this.fillAllWaybills();
      });
     }
   
  }

  updateWaybill(waybill:Waybill)
  {
    
    this.selectedWayBill=waybill;
    this.dialogVisible = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }
  onWaybillPreview(waybill:Waybill)
  {
    
  }
  onCloseNewWaybillDialog()
  {
    this.selectedWayBill=null;
  }

}
