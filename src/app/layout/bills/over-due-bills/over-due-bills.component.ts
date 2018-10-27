import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Bill } from '../../../shared/DTOs/Bill';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-over-due-bills',
  templateUrl: './over-due-bills.component.html',
  styleUrls: ['./over-due-bills.component.scss']
})
export class OverDueBillsComponent implements OnInit {

  overDueBills:Bill[]=[];
  loading:boolean=true;
  config:IConfig;
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private billService:BillService,private configService:ConfigService) { }
  
    ngOnInit() {
      this.config=this.configService.getAppConfig();
  
      this.billService.getOverDueBills(this.config.getOverDueBillsUrl,null).subscribe(bills=>{
  this.overDueBills=bills;
      }, error=>{
        this.toastr.error("Faturalar Getirilirken Hata oluştu...");
      },()=>{
        this.loading=false;
      });
    }

}
