import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';
import { IConfig, ConfigService } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-this-week-waybills',
  templateUrl: './this-week-waybills.component.html',
  styleUrls: ['./this-week-waybills.component.scss']
})
export class ThisWeekWaybillsComponent implements OnInit {
  config:IConfig;
waybills:Waybill[]=[];  
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private waybillService:WaybillService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisWeekWaybills();
  }
  getThisWeekWaybills()
  {
    this.waybillService.getThisWeekWaybills(this.config.getThisWeekWaybillsUrl,null).subscribe(waybills=>{
      this.waybills=waybills;

    },error=>{
      this.toastr.error("irsaliyeler getirilirken bir hata meydana geldi...");
    });
  }
}
