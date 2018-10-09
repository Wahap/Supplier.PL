import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Supplier } from '../../../shared/DTOs/supplier';
import { CommonService } from '../../../shared/common.service';
import { ConfigService, IConfig } from '../../../app.config';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { Category } from '../../../shared/DTOs/category';
import { ProductsService } from '../../products/products.service';
import { Totals } from '../../../shared/DTOs/totals';
import { VendorBill } from '../../../shared/DTOs/vendorBill';
import { VendorBillService } from '../vendor-bill.service';
import { VendorBillProduct } from '../../../shared/DTOs/vendorBillProduct';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-vendor-bill',
  templateUrl: './save-vendor-bill.component.html',
  styleUrls: ['./save-vendor-bill.component.scss']
})
export class SaveVendorBillComponent implements OnInit {
  suppliers: Supplier[] = [];
  selectedSupplier:Supplier;
  config: IConfig;
  billDate: Date = new Date();
  basketProducts: BasketProduct[] = [];
  productListCols: any[];
  loading: boolean;  
  categories: Category[] = [];
  currentBillTotals: Totals = new Totals();
  currentBill: BasketProduct[] = [];
  deletedBasketProducts: BasketProduct[] = [];
  isBillSaving:boolean=false;
  billNumber: string;
  @ViewChild('billProductsContainer') private billProductsContainer: ElementRef;
  @Input()
  selectedBill: VendorBill;
  constructor(private vendorBillService:VendorBillService, private commonService: CommonService,private configService: ConfigService,private productsService:ProductsService, public toastr: ToastsManager,public router: Router) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.fillSuppliers();
    this.fillCategories();
    this.getProducts();
    this.productListCols = [
      { field: 'barcodeOfProduct', header: 'Barkod' },
      { field: 'orderNumber', header: 'S.No' },
      { field: 'productName', header: 'Ürün' },
      { field: 'purchasePrice', header: 'Alış Fiyat' },
      { field: 'package', header: 'Koli' }
    ];
  }

  ngOnChanges() {
    if (this.selectedBill != null && this.suppliers.length > 0) {

     
      this.billDate = new Date(this.selectedBill.billDate);
      this.selectedSupplier = this.suppliers.find(x => x.id == this.selectedBill.supplierId);
      this.billNumber = this.selectedBill.billNumber;
      this.billDate=new Date(this.selectedBill.billDate);
      this.deletedBasketProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentBillProducts();
    }

  }

  mapSelectedBillProductsToCurrentBillProducts() {
    this.vendorBillService.getVendorBillProducts(this.config.getVendorBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill = billProducts.map((billProduct: VendorBillProduct) => {
        let basketProduct = new BasketProduct();
        basketProduct.id = billProduct.id;
        basketProduct.package = billProduct.numberOfPackage;
        basketProduct.product = billProduct.product;
        basketProduct.product.purchasePrice = billProduct.purchasePrice;
        return basketProduct;
      });
      this.calculateCurrentBillPrices();
    });
  }
  saveBill() {
    this.isBillSaving=true;
    let bill: VendorBill = new VendorBill();
    if (this.selectedBill != null) {//Bill Updating...
      bill.id = this.selectedBill.id;
    }
    else//New bill adding...
    {
      bill.isPaid = false;
    }
    bill.billNumber = this.billNumber;
    bill.supplierId = this.selectedSupplier.id;
    bill.billDate = this.billDate;
    this.currentBill.forEach(basketProduct => {
      let billProduct = new VendorBillProduct();
      billProduct.id = basketProduct.id;
      billProduct.vendorBillId = bill.id;
      billProduct.numberOfPackage = basketProduct.package;
      billProduct.purchasePrice = basketProduct.product.purchasePrice;
      billProduct.tax = basketProduct.product.tax;
      billProduct.status=basketProduct.status;
      billProduct.productId = basketProduct.product.id;
      bill.vendorBillProducts.push(billProduct);
    });

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedBillProduct = new VendorBillProduct();
      deletedBillProduct.id = dltd.id;
      deletedBillProduct.productId = dltd.product.id;
      deletedBillProduct.status = 'deleted';
      bill.vendorBillProducts.push(deletedBillProduct);

    });

    this.vendorBillService.saveVendorBill(this.config.saveVendorBillUrl, bill).subscribe(result => {
      this.toastr.success("Fatura başarıyla kaydedildi...");
      this.isBillSaving=false;
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('thisMonthVendorBills');
      }
      else {//update waybill operation completed
        location.reload();
      }


    });
  }
  increase(basketProduct: BasketProduct) {
    basketProduct.package++;
    basketProduct.status = "edited";
    this.saveProductToCurrentBill(basketProduct);
  }
  decrease(basketProduct: BasketProduct) {

    if (basketProduct.package > 0)//prevent negative inputs
    {
      basketProduct.package--;
      basketProduct.status = "edited";
      this.saveProductToCurrentBill(basketProduct);
    }


    // this.getProductsInBasket();
  }
  removeProductToCurrentBill(billProduct: BasketProduct) {
    billProduct.package = 0;
    this.saveProductToCurrentBill(billProduct);
  }
  setPackage(basketProduct: BasketProduct, type) {

    if (basketProduct.package > 0) {
      basketProduct.status = "edited";
      this.saveProductToCurrentBill(basketProduct);
    }


  }
  saveProductToCurrentBill(basketProduct: BasketProduct) {

    let editedBasketProduct = this.currentBill.find(x => x.product.id == basketProduct.product.id);
    if (editedBasketProduct != undefined && basketProduct.package < 1)//Delete product from currentBill
    {

      let index = this.currentBill.findIndex(item => item.product.id == basketProduct.product.id);
      this.currentBill.splice(index, 1);
      if (this.selectedBill != null)//Update operation
      {
        this.deletedBasketProducts.push(basketProduct);
      }

    }
    else if (editedBasketProduct == undefined)//product will be added first time
    {
      this.currentBill.push(basketProduct);
      //scroll bottom 
      this.billProductsContainer.nativeElement.scrollTop = this.billProductsContainer.nativeElement.scrollHeight;

    }
    else//product exist in waybill, update the package
    {
      editedBasketProduct.package = basketProduct.package;
    }
    this.calculateCurrentBillPrices();
  }

  calculateCurrentBillPrices() {
    this.currentBillTotals = new Totals();
    this.currentBill.forEach(basketProduct => {
      let numberOfPieces = basketProduct.package * basketProduct.product.unitsInPackage;
      this.currentBillTotals.totalPackages += basketProduct.package;
      this.currentBillTotals.totalPieces += numberOfPieces;
      this.currentBillTotals.totalNetPrice += numberOfPieces * basketProduct.product.netSalePrice;
      this.currentBillTotals.totalTaxPrice += numberOfPieces * (basketProduct.product.netSalePrice * basketProduct.product.tax / 100);
    
      this.currentBillTotals.totalGrossPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice;
    });
    this.currentBillTotals.totalItems = this.currentBill.length;
  }
  getProducts() {
   
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsUrl,null).subscribe(items => {
     
      this.basketProducts = items.data.map(product => {
        let basketProduct = new BasketProduct();
        basketProduct.product = product;
        basketProduct.package = 0;
        return basketProduct;
      });
      //this.fillBasketProducts();
      this.loading = false;
    });
  }

  fillCategories() {
    this.commonService.getCategories(this.config.getCategoriesUrl, null).subscribe(categories => {
      this.categories = categories;


    });
  }
  fillSuppliers() {
    this.commonService.getSuppliers(this.config.getSuppliersUrl, null).subscribe(result => {
      this.suppliers = result;
    });
  }
  filterProductsByCategory(filteredCategoryId, basketProduct:BasketProduct) {
  
    if (filteredCategoryId == undefined || filteredCategoryId == 0) {
      return true;
    }
    else if (basketProduct.product.category == null) {
      return false;
    }
   
    else {
      return basketProduct.product.categoryId == filteredCategoryId;
    }
  }
  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }
}
