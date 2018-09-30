import { Component, OnInit, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgForm } from '@angular/forms';
import { ConfigService, IConfig } from '../../app.config';
import { ProductsService } from './products.service';
import { Product } from '../../shared/DTOs/product';
import { brand } from '../../shared/DTOs/brand';
import { CommonService } from '../../shared/common.service';
import { category } from '../../shared/DTOs/category';
import { unit } from '../../shared/DTOs/unit';
import { supplier } from '../../shared/DTOs/supplier';
import 'jspdf';
declare var jsPDF: any; // Important 
import 'html2canvas';
declare var html2canvas: any; // Important 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None//For using this component css styles globally
})
export class ProductsComponent implements OnInit {
  units: unit[];
  selectedUnit: unit;
  config: IConfig;
  products: Product[] = [];
  selectedProduct: Product;
  product: Product;
  newProduct: boolean;
  loading: boolean;
  displayDialog: boolean;
  displayChangeImg: boolean;
  brands: brand[];
  selectedBrand: brand;
  categories: category[];
  selectedCategory: category;
  suppliers: supplier[];
  selectedSupplier: supplier;
  deleteButtonText: string
  taxNumbers: Array<any> = [];
  selectedTax: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  hideImageUrl: boolean;
  productListCols: any[];
  isShowBrochure: boolean = false;

  @ViewChild("fileInput") fileInput;

  constructor(private commonServices: CommonService, private productsService: ProductsService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.product = new Product()
    this.deleteButtonText = 'Pasif Et';
    this.loading = false;
    this.selectedBrand = new brand();
    this.selectedCategory = new category();
    this.selectedUnit = new unit();
    this.selectedSupplier = new supplier();
    this.product = new Product();
    this.taxNumbers = [{ "data": "7" }, { "data": "19" }, { "data": "0" }];
    this.selectedTax = this.taxNumbers[0];

  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getProducts();
     this.getAllBrands();
     this.getAllUnits();
     this.getCategories();
     this.getSuppliers();
    this.hideImageUrl = false;
    this.productListCols = [
      { field: 'resim', header: 'Resim' },
      { field: 'barcodeOfProduct', header: 'Barkod' },
      { field: 'orderNumber', header: 'S.No' },
      { field: 'productName', header: 'Ürün' },
      { field: 'unit', header: 'Birim' },
      { field: 'purchasePrice', header: 'Alış(€)' },
      { field: 'netSalePrice', header: 'Net Satış(€)' },
      { field: 'tax', header: 'Vergi(%)' },
      { field: 'brutPrice', header: 'Brüt Satış' }
    ];
  };

  showDialogToAdd() {
    this.newProduct = true;
    this.selectedBrand = new brand();
    this.selectedCategory = new category();
    this.selectedUnit = new unit();
    this.selectedSupplier = new supplier();
    this.product = new Product();
    this.selectedTax = this.taxNumbers[0];
    this.displayDialog = true;
  }

  delete(product: Product) {

    if(confirm("Ürünü silmek istediğinize emin misiniz?"))
    {
      this.product = product;
      this.save(false);
    }
    
  }
  save(isActive: boolean) {
    let products = [...this.products];
    this.product.brandId = this.selectedBrand.id;
    this.product.categoryId = this.selectedCategory.id;
    this.product.unitId = this.selectedUnit.id;
    this.product.supplierId = this.selectedSupplier.id;
    this.product.tax = this.selectedTax.data;
    this.product.isActive = isActive;
    this.productsService.saveProducts(this.config.saveProductsUrl, this.product)
      .subscribe(items => {
        if (items.data == true) {
          if (this.newProduct) {
            this.getProducts();
          }
          else {
            if (!this.product.isActive)//if delete button clicks
            {
              this.getProducts();
             // this.products.splice(this.findSelectedIndex(), 1);

            }

          }
          this.toastr.success('Urun Basariyla Kaydedildi.', 'Basarili !');
        }
      },
        error => this.toastr.error('Urun kaydedilirken hata ile karsilasildi.', 'Error!'),
        () => {
          //finally bloke ..!
          // No errors, route to new page

          this.displayDialog = false;
        });




  }
  exportProductsAsPdf() {
    var doc = new jsPDF();
    var col = ["BARKOD", "S.NO", "ÜRÜN", "FIYAT"];
    var rows = [];

    this.products.forEach(function (element) {

      var row = [];
      row.push(element.barcodeOfProduct);
      row.push(element.orderNumber);
      row.push(element.productName);
      row.push(element.netSalePrice);
      rows.push(row);
    });
    doc.autoTable(col, rows);
    doc.save('Products.pdf');
  }

  onRowSelect(product) {
    this.newProduct = false;
    // this.product = Object.assign({}, event.data);
    this.product = product;
    this.displayDialog = true;

    //set selected dropdowns values
    this.selectedBrand = this.brands.filter(x => x.id == this.product.brandId)[0];
    this.selectedCategory = this.categories.filter(x => x.id == this.product.categoryId)[0];
    this.selectedUnit = this.units.filter(x => x.id == this.product.unitId)[0];
    this.selectedSupplier = this.suppliers.filter(x => x.id == this.product.supplierId)[0];
    this.selectedTax = this.taxNumbers.filter(x => x.data == this.product.tax)[0];
    this.deleteButtonText = this.product.isActive != false ? 'Pasif Et' : 'Aktif Et';

  }
  showImgDialog(product) {
    this.product = Object.assign({}, product);
    this.displayChangeImg = true;
    this.hideImageUrl = false;
    this.croppedImage = null;
    //  this.imageChangedEvent=null;
  }

  findSelectedIndex(): number {
    let index = this.products.indexOf(this.product);
    return index;
  }

  // ==>Image funcs
  addFile(): void {

    //add some conditions , if barcodename is empty or croppedImage is 
    if (this.croppedImage == null) {
      this.toastr.error('Lutfen Resim ekleyiniz.', 'Error!');
    }
    this.loading = true;
    let fileToUpload = this.dataURItoBlob(this.croppedImage);
    let fileName = this.product.barcodeOfProduct;
    this.productsService.upload(this.config.uploadImageUrl + "?fileName=" + fileName, fileToUpload)
      .subscribe(res => {
        this.hideImageUrl = true;
        this.displayChangeImg = false;
        this.croppedImage = null;
        this.imageChangedEvent = null;

        this.toastr.success('Resim Kaydedildi.', 'Success!');
        this.loading = false;
      }),
      error => this.toastr.error('Resim Kaydedilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      };
  }
  //Converts 
  dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpg'
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.hideImageUrl = true;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    // show cropper
  }
  showBrochure() {
    this.isShowBrochure = true;

  }

  printBrochure() {
    


    var mywindow = window.open('', 'new div', 'height='+this.windowsHeight()+',width='+this.windowsWidth());
    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('<style>body{ font-family: Arial, Helvetica, sans-serif; }</style>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(document.querySelector("#brochure").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    setTimeout(function(){mywindow.print();},1000);
   
    

    //document.body.innerHTML = originalContents;

    // html2canvas(document.querySelector("#brochure")).then(canvas => {
    //   var doc = new jsPDF('p', 'pt', 'a4');
    //   var imgData = canvas.toDataURL('image/jpg',1.0);
    //  // window.open(imgData);
    //   doc.addImage(imgData, 'jpg', 5, 15, 210, 297,'','FAST');
      
    //   doc.save('brosur.pdf');

    //});

  }
  //==< Image funcs
  getProducts() {
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsUrl, null)
      .subscribe(items => {
        if (items.success) {
          this.products = items.data;
          console.log(this.products);
          this.loading = false;
        } else {
          this.toastr.error(items.message, 'Error!')
        }
      },
        error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!'),
        () => {
          //finally bloke ..!
          // No errors, route to new page
        }
      );
  }
  windowsHeight() {
    return (window.outerHeight * 0.80 - 120) + "px";
  }
  windowsWidth() {
    return (window.outerWidth * 0.80 - 120) + "px";
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
    return rowData.isActive ? "" : "inactive-row";
  }
  //#endregion

}
