import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Product } from '../../../shared/DTOs/product';
import { ProductsService } from '../products.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-passive-products',
  templateUrl: './passive-products.component.html',
  styleUrls: ['./passive-products.component.scss']
})
export class PassiveProductsComponent implements OnInit {
products:Product[]=[];
config:IConfig;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,private productsService:ProductsService,private configService:ConfigService) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.getProducts();
  }
  getProducts() {
  
    this.productsService.getPassiveProducts(this.config.getPassiveProductsUrl, null)
      .subscribe(items => {
        if (items.success) {
          this.products = items.data;
        
        
        } 
      },error=>{
        this.toastr.error("Ürünler Getirilirken Bir Hata Meydana Geldi...");
      });
  }
}
