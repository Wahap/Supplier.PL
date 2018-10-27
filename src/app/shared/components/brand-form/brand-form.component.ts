import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Brand } from '../../DTOs/brand';
import { ConfigService, IConfig } from '../../../app.config';
import { CommonService } from '../../common.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {
  config:IConfig;
  brand:Brand=new Brand();
  @Output() onBrandSaved=new EventEmitter();
  constructor(private configService:ConfigService,private commonService:CommonService,public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
  }

  saveBrand()
  {
    this.commonService.saveBrand(this.config.saveBrandUrl,this.brand).subscribe(brand=>{
      this.onBrandSaved.emit(brand);
    },error=>{
      this.toastr.error("Marka Eklenirken Hata Meydana Geldi...");
    });
  }

}
