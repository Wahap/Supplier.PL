import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { Product } from '../../../shared/DTOs/product';
import { IConfig, ConfigService } from '../../../app.config';
import { CustomersService } from '../../customers/customers.service';
import { ToastsManager } from 'ng2-toastr';
import { ProductsService } from '../../products/products.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Customer } from '../../../shared/DTOs/customer';
import { Address } from '../../../shared/DTOs/address';
import { BillService } from '../bill.service';
import { Bill } from '../../../shared/DTOs/Bill';
import { BillProduct } from '../../../shared/DTOs/billProduct';
import { ProductListOptions } from '../../../shared/DTOs/productListOptions';
import { Totals } from '../../../shared/DTOs/totals';
import { DiscountRate } from '../../../shared/DTOs/discountRate';
import { CommonService } from '../../../shared/common.service';
@Component({
  selector: 'app-save-bill',
  templateUrl: './save-bill.component.html',
  styleUrls: ['./save-bill.component.scss']
})
export class SaveBillComponent implements OnInit {
  config: IConfig;
  loading: boolean;
  basketProducts: BasketProduct[] = [];
  productList: Product[] = [];
  currentBill: BasketProduct[] = [];
  deletedBasketProducts: BasketProduct[] = [];
  customers: Customer[] = [];
  selectedCustomer: Customer = new Customer();
  selectedAddress: Address = new Address();
  deliveryAddress: Address = new Address();
  createdDate: Date;
  deliveryDate: Date;
  billNumber: number;
  billNumberIsValid: boolean = true;
  discountRates: DiscountRate[] = [];
  selectedDiscountRate: DiscountRate = new DiscountRate();
  isNewRecord: boolean;
  lastBill: Bill;
  priceTypeId: number;
  productListCols: any[];
  currentBillTotals: Totals = new Totals();
  @Input()
  selectedBill: Bill;
  constructor(private customerService: CustomersService, private commonService: CommonService, public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService, private productsService: ProductsService, private configService: ConfigService, public dialog: MatDialog, public router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loading = false;
    this.isNewRecord = true;
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillCustomers();
    this.fillDiscountRates();//Skonto

    this.getNextBillNumber();
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
      this.selectedDiscountRate = this.discountRates.find(x => x.id == this.selectedBill.discountRateId);
      this.deletedBasketProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentWaybillProducts();
    }

  }

  mapSelectedBillProductsToCurrentWaybillProducts() {
    this.billService.getBillProducts(this.config.getBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill = billProducts.map((billProduct: BillProduct) => {
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

  getNextBillNumber() {
    this.billService.getNextBillNumber(this.config.getNextBillNumberUrl, null).subscribe(billNumber => {
      this.billNumber = billNumber;
    });

  }

  fillDiscountRates() {
    this.commonService.getAllDiscountRates(this.config.getAllDiscountRatesUrl, null).subscribe(discountRates => {
      this.discountRates = discountRates;
      if (discountRates.length > 0)//prevent adding null DiscountId to bill
      {
        this.selectedDiscountRate = discountRates[0];
      }

    });
  }

  getProductFromCurrentBill(id: number) {
    for (let i = 0; i < this.currentBill.length; i++)//check if product exist in bill
    {
      if (this.currentBill[i].product.id == id) {
        return this.currentBill[i];
      }
    }
    return null;
  }
  saveBill() {
    let bill: Bill = new Bill();
    if (this.selectedBill != null) {
      bill.id = this.selectedBill.id;
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
    bill.discountRateId = this.selectedDiscountRate.id;
    bill.discountRate = null;//No need to create a new Discount rate
    this.currentBill.forEach(basketProduct => {
      let billProduct = new BillProduct();
      billProduct.id = basketProduct.id;
      billProduct.billId = bill.id;
      billProduct.numberOfPackage = basketProduct.package;
      billProduct.netSalePrice = basketProduct.product.netSalePrice;
      billProduct.tax = basketProduct.product.tax;
      billProduct.productId = basketProduct.product.id;
      billProduct.status = basketProduct.status;
      bill.billProducts.push(billProduct);
    });

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedBillProduct = new BillProduct();
      deletedBillProduct.id = dltd.id;
      deletedBillProduct.status = 'deleted';
      bill.billProducts.push(deletedBillProduct);

    });

    this.billService.saveBill(this.config.saveBillUrl, bill).subscribe(result => {
      this.toastr.success("Fatura başarıyla kaydedildi...");
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('bills');
      }
      else {//update waybill operation completed
        location.reload();
      }


    });
  }
  onBillNumberChange() {
    if (this.billNumber > 0) {
      let bill = new Bill();
      if (this.selectedBill != null) {
        bill.id = this.selectedBill.id;
      }
      bill.billNumber = this.billNumber;
      this.billService.checkBillNumberIsValid(this.config.checkBillNumberIsValidUrl, bill).subscribe((isValid) => {
        this.billNumberIsValid = isValid;
      });
    }

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
      console.log(items);
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
      this.currentBillTotals.discount = (this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice) * this.selectedDiscountRate.rate / 100;
      this.currentBillTotals.totalGrossPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice - this.currentBillTotals.extraDiscount - this.currentBillTotals.discount;
    });
    this.currentBillTotals.totalItems = this.currentBill.length;
  }







  fillCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result => {
      this.customers = result;
    });
  }


  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }

}
