import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Bill } from '../../../shared/DTOs/Bill';
import { customer } from '../../../shared/DTOs/customer';
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
  allCustomers:customer[]=[];
  dialogVisible:boolean=false;
  constructor(private configService: ConfigService,private billService:BillService,private customerService:CustomersService,public dialog: MatDialog) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillAllBills();
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
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '50%',
      data: { title:"irsaliyeyi silmek istediğinize emin misiniz?" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
     if(result=='yes')
     {  
      this.billService.deleteBill(this.config.deleteBillUrl,bill).subscribe(result=>{
        this.fillAllBills();
      });
     }
    });
  }

  updateBill(bill:Bill)
  {
    
    this.selectedBill=bill;
    this.dialogVisible = true;
    // this.waybillService.getWaybill(this.config.getWaybillUrl, waybill.id).subscribe(response=>{
      
    // });
  }

}
