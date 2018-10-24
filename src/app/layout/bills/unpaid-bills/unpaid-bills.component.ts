import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { BillService } from '../bill.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-unpaid-bills',
  templateUrl: './unpaid-bills.component.html',
  styleUrls: ['./unpaid-bills.component.scss']
})
export class UnpaidBillsComponent implements OnInit {
unpaidBills:Bill[]=[];
loading:boolean=true;
config:IConfig;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private billService:BillService,private configService:ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();

    this.billService.getUnpaidBills(this.config.getUnpaidBillsUrl,null).subscribe(bills=>{
this.unpaidBills=bills;
    }, error=>{
      this.toastr.error("Faturalar Getirilirken Hata oluştu...");
    },()=>{
      this.loading=false;
    });
  }

}
