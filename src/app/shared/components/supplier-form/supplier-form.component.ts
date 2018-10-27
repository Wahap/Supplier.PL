import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Supplier } from '../../DTOs/supplier';
import { CommonService } from '../../common.service';
import { ToastsManager } from 'ng2-toastr';
import { City } from '../../DTOs/city';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {

  config:IConfig;
  supplier:Supplier=new Supplier();
  cities:City[]=[];
  selectedCity:City=new City();
  @Output() onSupplierSaved=new EventEmitter();
  constructor(private configService:ConfigService,private commonService:CommonService,public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.commonService.getCities(this.config.getAllCitiesUrl,null).subscribe(cities=>{
      this.cities=cities;
    },
    error=>{
      this.toastr.error("Şehirler Getirilirken Hata Oluştu...");
    }
    );
  }

  saveSupplier()
  {
    this.supplier.isActive=true;
    this.supplier.cityId=this.selectedCity.id;
    this.commonService.saveSupplier(this.config.saveSupplierUrl,this.supplier).subscribe(supplier=>{
      this.onSupplierSaved.emit(supplier);
    },error=>{
      this.toastr.error("Toptancı Eklenirken Hata Meydana Geldi...");
    });
  }

  onNewCitySaved(city)
  {
    this.cities=[city,...this.cities];
    this.selectedCity=city;
  }

}
