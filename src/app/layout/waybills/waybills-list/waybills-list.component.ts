import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { customer } from '../../../shared/DTOs/customer';
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
  allCustomers:customer[]=[];
  constructor(private configService: ConfigService,private waybillService:WaybillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillAllWaybills();
    this.fillAllCustomers();
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
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '50%',
      data: { title:"irsaliyeyi silmek istediğinize emin misiniz?" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
     if(result=='yes')
     {
      this.waybillService.deleteWaybill(this.config.deleteWaybillUrl,waybill).subscribe(result=>{
        this.fillAllWaybills();
      });
     }
    });
  }

  updateWaybill(waybill:Waybill)
  {
    alert(waybill.id);
    this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    });
  }

}
