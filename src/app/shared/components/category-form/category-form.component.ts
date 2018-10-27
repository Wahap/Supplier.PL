import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { Category } from '../../DTOs/category';
import { CommonService } from '../../common.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  config:IConfig;
  category:Category=new Category();
  @Output() onCategorySaved=new EventEmitter();
  constructor(private configService:ConfigService,private commonService:CommonService,public toastr: ToastsManager, vcr: ViewContainerRef) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
  }

  saveCategory()
  {
    this.category.isActive=true;
    this.commonService.saveCategory(this.config.saveCategoryUrl,this.category).subscribe(category=>{
      this.onCategorySaved.emit(category);
    },error=>{
      this.toastr.error("Kategori Eklenirken Hata Meydana Geldi...");
    });
  }

}
