import { Component, OnInit } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-this-month-waybills',
  templateUrl: './this-month-waybills.component.html',
  styleUrls: ['./this-month-waybills.component.scss']
})
export class ThisMonthWaybillsComponent implements OnInit {

  config:IConfig;
  waybills:Waybill[]=[];
    constructor(private waybillService:WaybillService,private configService: ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getThisMonthWaybills();
  }
  getThisMonthWaybills()
  {
    this.waybillService.getThisWeekWaybills(this.config.getThisMonthWaybillsUrl,null).subscribe(waybills=>{
      this.waybills=waybills;

    });
  }

}
