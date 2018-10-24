import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-this-month-waybills',
  templateUrl: './this-month-waybills.component.html',
  styleUrls: ['./this-month-waybills.component.scss']
})
export class ThisMonthWaybillsComponent implements OnInit {

  config:IConfig;
  loading:boolean=true;
  waybills:Waybill[]=[];
    constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private waybillService:WaybillService,private configService: ConfigService) 
    {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthWaybills();
  }
  getThisMonthWaybills()
  {
    this.waybillService.getThisWeekWaybills(this.config.getThisMonthWaybillsUrl,null).subscribe(waybills=>{
      this.waybills=waybills;

    },error=>{
      this.toastr.error("irsaliyeler getirilirken bir hata meydana geldi...");
    },()=>{
      this.loading=false;
    });
  }

}
