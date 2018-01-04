import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgForm }    from '@angular/forms';
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
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  units: unit[];
  selectedUnit: unit;
  config: IConfig;
  products: product[];
  selectedProduct: product;
  product: product;
  newProduct: boolean;
  loading: boolean;
  displayDialog: boolean;
  brands: brand[];
  selectedBrand: brand;
  categories: category[];
  selectedCategory: category;
  suppliers: supplier[];
  selectedSupplier: supplier; 
  deleteButtonText:string
  taxNumbers:Array<any> = [];
  selectedTax:any;

  constructor(private commonServices: CommonService, private productsService: ProductsService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.product =new product()
    this.deleteButtonText='Pasif Et';
    this.loading=false;
    this.selectedBrand = new brand();
    this.selectedCategory = new category();
    this.selectedUnit = new unit();
    this.selectedSupplier = new supplier();
    this.product = new product();
    this.taxNumbers=[{"data":"7"},{"data":"19"},{"data":"0"}];
    this.selectedTax=this.taxNumbers[0];

  }

  showDialogToAdd() {
    this.newProduct = true;
    this.selectedBrand = new brand();
    this.selectedCategory = new category();
    this.selectedUnit = new unit();
    this.selectedSupplier = new supplier();
    this.product = new product();
    this.selectedTax=this.taxNumbers[0];
    this.displayDialog = true;
  }
  delete() {
    this.product.isActive=!this.product.isActive;
    this.save();
  }
  save() {
    let products = [...this.products];
    this.product.brandId = this.selectedBrand.id;
    this.product.categoryId = this.selectedCategory.id;
    this.product.unitId = this.selectedUnit.id;
    this.product.supplierId = this.selectedSupplier.id;
    this.product.tax=this.selectedTax.data;
 
    this.productsService.saveProducts(this.config.saveProductsUrl, this.product)
      .subscribe(items => {
        if (items == true) {
          if (this.newProduct) {
            this.getProducts();
          }
          else {
            products[this.findSelectedCarIndex()] = this.product;
            this.products = products;
            this.product = null;
          }
          this.toastr.success('Urun Basariyla Kaydedildi.', 'Basarili!');
        }
      },
      error => this.toastr.error('Urun kaydedilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
       
        this.displayDialog = false;
      });




  }
  onRowSelect(event) {
    this.newProduct = false;
    this.product = Object.assign({}, event.data);
    this.displayDialog = true;

    //set selected dropdowns values
    this.selectedBrand = this.brands.filter(x => x.id == this.product.brandId)[0];
    this.selectedCategory = this.categories.filter(x => x.id == this.product.categoryId)[0];
    this.selectedUnit = this.units.filter(x => x.id == this.product.unitId)[0];
    this.selectedSupplier = this.suppliers.filter(x => x.id == this.product.supplierId)[0];
    this.selectedTax = this.taxNumbers.filter(x => x.data == this.product.tax)[0];
    this.deleteButtonText=this.product.isActive!=false?'Pasif Et':'Aktif Et';

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

  getProducts() {
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsUrl, this.products)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.products = items;
          this.loading = false;
        }
      },
      error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

  //#region Bindings
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
  customize(rowData, rowIndex): string {
    return  rowData.isActive?"": "disabled-product-row";
}
 //#endregion

}
