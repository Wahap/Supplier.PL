import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { IConfig, ConfigService } from '../../app.config';
import { ProductPriceGroup } from '../../shared/DTOs/productPriceGroup';
import { PriceGroup } from '../../shared/DTOs/priceGroup';
import { Product } from '../../shared/DTOs/product';
import { ToastsManager } from 'ng2-toastr';
import 'jspdf';
declare var jsPDF: any; // Important 

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

  constructor(private configService: ConfigService, private productService: ProductsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getAllGroupsPrices();

  }

  getAllGroupsPrices() {
    this.productService.getAllGroupPrices(this.config.getAllGroupsPricesUrl, null).subscribe(products => {
      this.isAllGroupsPricesLoading = false;
      this.allGroupsPrices = products.map(function (product: Product) {
        //checking is there bronze Price in PriceGroupList
        let bronze = product.productPriceGroups.find(function (obj) {
          return obj.priceGroupId == 1;
        });
        let silver = product.productPriceGroups.find(function (obj) {
          return obj.priceGroupId == 2;
        });
        let gold = product.productPriceGroups.find(function (obj) {
          return obj.priceGroupId == 3;
        });
        if (!bronze)//BronzePrice Doesnt exist
        {
          product.bronzePriceGroup = { id: 0, productId: product.id, price: 0, priceGroupId: 1 };
        }
        else {
          product.bronzePriceGroup = { id: bronze.id, productId: bronze.productId, price: bronze.price, priceGroupId: bronze.priceGroupId };
        }
        if (!silver) {
          product.silverPriceGroup = { id: 0, productId: product.id, price: 0, priceGroupId: 2 };
        }
        else {
          product.silverPriceGroup = { id: silver.id, productId: silver.productId, price: silver.price, priceGroupId: silver.priceGroupId };
        }

        if (!gold) {
          product.goldPriceGroup = { id: 0, productId: product.id, price: 0, priceGroupId: 3 };
        }
        else {
          product.goldPriceGroup = { id: gold.id, productId: gold.productId, price: gold.price, priceGroupId: gold.priceGroupId };
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
  saveGroupPrices(product: Product) {
    let groupPrices: ProductPriceGroup[] = [];
    groupPrices.push(product.bronzePriceGroup);
    groupPrices.push(product.silverPriceGroup);
    groupPrices.push(product.goldPriceGroup);

    this.productService.saveProductGroupPrices(this.config.saveProductGroupPricesUrl, groupPrices).subscribe(response => {
      this.toastr.success("Fiyat Grubu Başarıyla Güncellendi","Başarılı");
    });
  }

  exportPricesAsPdf(priceGroupId:number)//0:Fixed,1:Bronze,2:Silver,3:Gold
  {
    var doc = new jsPDF();
    var col = ["BARKOD","S.NO","ÜRÜN","FIYAT"];
    var rows = [];

    this.allGroupsPrices.forEach(function (element) {

      var row = [];
      row.push(element.barcodeOfProduct);
      row.push(element.orderNumber);
      row.push(element.productName);
      if(priceGroupId==0){row.push(element.netSalePrice);}
      else if(priceGroupId==1){row.push(element.bronzePriceGroup.price);}
      else if(priceGroupId==2){row.push(element.silverPriceGroup.price);}
      else if(priceGroupId==3){row.push(element.goldPriceGroup.price);}
      
      rows.push(row);
    });
    doc.autoTable(col, rows);
    doc.save('FiyatListesi.pdf');
  }
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }

}
