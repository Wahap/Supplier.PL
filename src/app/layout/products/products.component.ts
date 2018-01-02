import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConfigService, IConfig } from '../../app.config';
import { ProductsService } from './products.service';
import { product } from '../../shared/DTOs/product';
import { brand } from '../../shared/DTOs/brand';
import { CommonService } from '../../shared/common.service';
import { category } from '../../shared/DTOs/category';
import { unit } from '../../shared/DTOs/unit';
import { supplier } from '../../shared/DTOs/supplier';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  units: unit[];
  selectedUnit = unit;
  config: IConfig;
  products: product[];
  selectedProduct: product;
  product: product;
  newProduct: boolean;
  loading: boolean;
  displayDialog: boolean;
  brands: brand[];
  selectedBrand: any;
  categories: category[];
  selectedCategory: category;
  suppliers: supplier[];
  selectedSupplier: supplier;

  constructor(private commonServices: CommonService, private productsService: ProductsService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
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
    this.getAllBrands();
    this.getAllUnits();
    this.getCategories();
    this.getSuppliers();

  }

  //Bindings
  getCategories() {
    this.commonServices.getCategories(this.config.getCategoriesUrl, this.categories)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.categories = items;
        }
      },
      error => this.toastr.error('Kategoriler getirilirken hata ile karsilasildi.', 'Error!')
      );
  }
  getSuppliers() {
    this.commonServices.getSuppliers(this.config.getSuppliersUrl, this.suppliers)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.suppliers = items;
        }
      },
      error => this.toastr.error('Kategoriler getirilirken hata ile karsilasildi.', 'Error!')
      );
  }
  getAllUnits() {
    this.commonServices.getAllUnits(this.config.getAllUnitsUrl, this.units)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.units = items;
        }
      },
      error => this.toastr.error('Tum Unitler getirilirken hata ile karsilasildi.', 'Error!')
      );
  }
  getAllBrands() {
    this.commonServices.getAllBrands(this.config.getAllBrandsUrl, this.brands)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.brands = items;
        }
      },
      error => this.toastr.error('Tum Unitler getirilirken hata ile karsilasildi.', 'Error!')
      );
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

}
