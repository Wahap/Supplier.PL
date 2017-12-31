import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfigService, IConfig } from '../../app.config';
import { ProductsService } from './products.service';
import { product } from '../../shared/DTOs/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  config: IConfig;
  products: product[];
  selectedProduct: product;
  product: product;
  newProduct: boolean;
  loading: boolean;
  displayDialog: boolean;
  constructor(private productsService: ProductsService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  getProducts() {
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsUrl, this.products)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.products = items;
          this.loading = false;
        }
      },
      error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!')
      );
  }
  showDialogToAdd() {
    this.newProduct = true;
    this.product = new product();
    this.displayDialog = true;
  }
  delete() {
    let index = this.findSelectedCarIndex();
    this.products = this.products.filter((val, i) => i != index);
    this.product = null;
    this.displayDialog = false;
  }
  save() {
    let products = [...this.products];
    if (this.newProduct)
      products.push(this.product);
    else
      products[this.findSelectedCarIndex()] = this.product;

    this.products = products;
    this.product = null;
    this.displayDialog = false;
  }
  onRowSelect(event) {
    this.newProduct = false; 
    this.product = this.cloneProduct(event.data);
    this.displayDialog = true;
  }

  cloneProduct(p: product): product {
    let pro = new product();
    for (let prop in p) {
      product[prop] = p[prop];
    }
    return pro;
  }

  findSelectedCarIndex(): number {
    return this.products.indexOf(this.selectedProduct);
  }
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getProducts();
  }

}
