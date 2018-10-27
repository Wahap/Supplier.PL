import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Unit } from '../../DTOs/unit';
import { CommonService } from '../../common.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.scss']
})
export class UnitFormComponent implements OnInit {

  config:IConfig;
  unit:Unit=new Unit();
  @Output() onUnitSaved=new EventEmitter();
  constructor(private configService:ConfigService,private commonService:CommonService,public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
  }

  saveUnit()
  {
    this.unit.isActive=true;
    this.commonService.saveUnit(this.config.saveUnitUrl,this.unit).subscribe(unit=>{
      this.onUnitSaved.emit(unit);
    },error=>{
      this.toastr.error("Birim Eklenirken Hata Meydana Geldi...");
    });
  }

}
