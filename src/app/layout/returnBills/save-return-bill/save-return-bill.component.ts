import { Component, OnInit, ViewContainerRef, Input, ViewChild, ElementRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { CustomersService } from '../../customers/customers.service';
import { ToastsManager } from 'ng2-toastr';
import { ReturnBillService } from '../return-bill.service';
import { ProductsService } from '../../products/products.service';
import { Router } from '@angular/router';
import { Customer } from '../../../shared/DTOs/customer';
import { Category } from '../../../shared/DTOs/category';
import { CommonService } from '../../../shared/common.service';
import { Address } from '../../../shared/DTOs/address';
import { ProductListOptions } from '../../../shared/DTOs/productListOptions';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { Totals } from '../../../shared/DTOs/totals';
import { ReturnBill } from '../../../shared/DTOs/returnBill';
import { ReturnBillProduct } from '../../../shared/DTOs/returnBillProduct';

@Component({
  selector: 'app-save-return-bill',
  templateUrl: './save-return-bill.component.html',
  styleUrls: ['./save-return-bill.component.scss']
})
export class SaveReturnBillComponent implements OnInit {
  config: IConfig;
  loading: boolean=false;  
  customers: Customer[] = [];
  categories: Category[] = [];
  productListCols: any[];
  billNumber: number;
  priceTypeId: number=1;
  createdDate: Date = new Date();
  deliveryDate: Date = new Date();
  selectedAddress: Address = new Address();
  deliveryAddress: Address = new Address();
  selectedCustomer: Customer = new Customer();
  basketProducts: BasketProduct[] = [];
  isDirty:boolean=false;
  billNumberIsValid: boolean = true;
  currentBillTotals: Totals = new Totals();
  currentBill: BasketProduct[] = [];
  deletedBasketProducts: BasketProduct[] = [];
  isBillSaving:boolean=false;
  @ViewChild('billProductsContainer') private billProductsContainer: ElementRef;
  @Input()
  selectedBill: ReturnBill;
  constructor(private customerService: CustomersService,private commonService: CommonService, public toastr: ToastsManager,vcr: ViewContainerRef, private returnBillService: ReturnBillService, private productsService: ProductsService, private configService: ConfigService, public router: Router) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   
   }
 
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillCustomers();
    this.fillCategories();
    this.getNextReturnBillNumber();
    this.productListCols = [
      { field: 'barcodeOfProduct', header: 'Barkod' },
      { field: 'orderNumber', header: 'S.No' },
      { field: 'productName', header: 'Ürün' },
      { field: 'netSalePrice', header: 'Fiyat' },
      { field: 'package', header: 'Koli' }
    ];
  }

  ngOnChanges() {
    if (this.selectedBill != null && this.customers.length > 0) {

      this.selectedCustomer = this.customers.find(x => x.id == this.selectedBill.customerId);
      this.selectedAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.addressId);
      this.deliveryAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.deliveryAddressId);
      this.createdDate = new Date(this.selectedBill.createdDate);
      this.deliveryDate = new Date(this.selectedBill.deliveryDate);
      this.billNumber = this.selectedBill.billNumber;
      this.selectedCustomer.extraDiscount = this.selectedBill.extraDiscount;//discount sync
      this.deletedBasketProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentBillProducts();
      this.getProducts();
    }
    
  }

  mapSelectedBillProductsToCurrentBillProducts() {
    this.returnBillService.getReturnBillProducts(this.config.getReturnBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill = billProducts.map((billProduct: ReturnBillProduct) => {
        let basketProduct = new BasketProduct();
        basketProduct.id = billProduct.id;
        basketProduct.package = billProduct.numberOfPackage;
        basketProduct.product = billProduct.product;
        basketProduct.product.netSalePrice = billProduct.netSalePrice;
        return basketProduct;
      });
      this.calculateCurrentBillPrices();
    });
  }

  saveBill() {
    this.isBillSaving=true;
    let bill: ReturnBill = new ReturnBill();
    if (this.selectedBill != null) {//Bill Updating...
      bill.id = this.selectedBill.id;
    }
    else//New bill adding...
    {
      bill.isPaid = false;
    }
    // else if (this.lastWaybill != null) {
    //   waybill.id = this.lastWaybill.id;
    // }
    bill.addressId = this.selectedAddress.id;
    bill.billNumber = this.billNumber;
    bill.customerId = this.selectedCustomer.id;
    bill.extraDiscount = this.selectedCustomer.extraDiscount;
    bill.createdDate = this.createdDate;
    bill.deliveryDate = this.deliveryDate;
    bill.deliveryAddressId = this.deliveryAddress.id;
    bill.billStatus = 1;
    bill.isActive = true;
    this.currentBill.forEach(basketProduct => {
      let billProduct = new ReturnBillProduct();
      billProduct.id = basketProduct.id;
      billProduct.returnBillId = bill.id;
      billProduct.numberOfPackage = basketProduct.package;
      billProduct.netSalePrice = basketProduct.product.netSalePrice;
      billProduct.purchasePrice = basketProduct.product.purchasePrice;
      billProduct.tax = basketProduct.product.tax;
      billProduct.productId = basketProduct.product.id;
      billProduct.status = basketProduct.status;
      bill.returnBillProducts.push(billProduct);
    });

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedBillProduct = new ReturnBillProduct();
      deletedBillProduct.id = dltd.id;
      deletedBillProduct.productId = dltd.product.id;
      deletedBillProduct.status = 'deleted';
      bill.returnBillProducts.push(deletedBillProduct);

    });

    this.returnBillService.saveReturnBill(this.config.saveReturnBillUrl, bill).subscribe(result => {
      this.isDirty=false;
      this.toastr.success("Fatura başarıyla kaydedildi..."); 
      this.isBillSaving=false;
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('thisMonthReturnBills');
      }
      else {//update waybill operation completed
        location.reload();
      }


    }); 
  }
  fillCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result=>{
      this.customers=result;
    });
  }
  fillCategories() {
    this.commonService.getCategories(this.config.getCategoriesUrl, null).subscribe(categories => {
      this.categories = categories;


    });
  }

  getNextReturnBillNumber() {
    this.returnBillService.getNextReturnBillNumber(this.config.getNextReturnBillNumberUrl, null).subscribe(billNumber => {
      this.billNumber = billNumber;
    });

  }
  onCustomerSelect() {
    this.selectedAddress = this.selectedCustomer.addresses[0];
    this.deliveryAddress = this.selectedCustomer.addresses[0];
    this.getProducts();
  }
  getProducts() {
    if (!this.selectedCustomer.id) {
      alert("Lütfen önce müşteri seçiniz");
      return;
    }
    this.loading = true;
    let productListOptions = new ProductListOptions();
    productListOptions.customerId = this.selectedCustomer.id;
    productListOptions.priceTypeId = this.priceTypeId;
    this.productsService.getProducts(this.config.getProductsByPriceTypeUrl, productListOptions).subscribe(items => {
     
      this.basketProducts = items.map(product => {
        let basketProduct = new BasketProduct();
        basketProduct.product = product;
        basketProduct.package = 0;
        return basketProduct;
      });
      //this.fillBasketProducts();
      this.loading = false;
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

  onPriceChange(basketProduct:BasketProduct)
  {
    basketProduct.status="edited";
  }

  onTaxChange(basketProduct:BasketProduct)
  {
    basketProduct.status="edited";
  }
  saveProductToCurrentBill(basketProduct: BasketProduct) {
    this.isDirty=true;
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
      this.currentBillTotals.extraDiscount = (this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice) * this.selectedCustomer.extraDiscount / 100;
      this.currentBillTotals.discount = (this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice);
      this.currentBillTotals.totalGrossPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice - this.currentBillTotals.extraDiscount - this.currentBillTotals.discount;
    });
    this.currentBillTotals.totalItems = this.currentBill.length;
  }
  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }

}
