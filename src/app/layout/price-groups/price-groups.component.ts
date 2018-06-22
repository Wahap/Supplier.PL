import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { IConfig, ConfigService } from '../../app.config';
import { ProductPriceGroup } from '../../shared/DTOs/productPriceGroup';
import { PriceGroup } from '../../shared/DTOs/priceGroup';
import { Product } from '../../shared/DTOs/product';

@Component({
  selector: 'app-price-groups',
  templateUrl: './price-groups.component.html',
  styleUrls: ['./price-groups.component.scss']
})
export class PriceGroupsComponent implements OnInit {

  config: IConfig;
  priceGroup: PriceGroup = new PriceGroup();
  allGroupsPrices: Product[];
  isAllGroupsPricesLoading: boolean = true;
  constructor(private configService: ConfigService, private productService: ProductsService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getAllGroupsPrices();

  }

  getAllGroupsPrices() {
    this.productService.getAllGroupPrices(this.config.getAllGroupsPricesUrl, null).subscribe(products => {
      this.isAllGroupsPricesLoading=false;
      this.allGroupsPrices = products.map(function(product:Product){
        //checking is there bronze Price in PriceGroupList
        let bronze=product.productPriceGroups.find(function(obj){
          return obj.priceGroupId==1;
        });
        let silver=product.productPriceGroups.find(function(obj){
          return obj.priceGroupId==2;
        });
        let gold=product.productPriceGroups.find(function(obj){
          return obj.priceGroupId==3;
        });
        if(!bronze)
        {
         product.productPriceGroups.push({id:0, productId:product.id, price:0, priceGroupId:1 });
        }
        if(!silver)
        {
         product.productPriceGroups.push({id:0, productId:product.id, price:0, priceGroupId:2 });
        }
        if(!gold)
        {
         product.productPriceGroups.push({id:0, productId:product.id, price:0, priceGroupId:3 });
        }
        
        return product;
      });
     
    });
  }

  showGroupPrices(priceGroupId) {
    this.priceGroup.id = priceGroupId;
    this.productService.getGroupPrices(this.config.getGroupPricesUrl, this.priceGroup).subscribe(response => {

      console.log(response);
    });
  }

  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }

}
