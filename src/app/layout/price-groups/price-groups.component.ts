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
    this.productService.getAllGroupPrices(this.config.getAllGroupsPricesUrl, null).subscribe(items => {
      this.isAllGroupsPricesLoading=false;
      this.allGroupsPrices = items;
      console.log(items);
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
