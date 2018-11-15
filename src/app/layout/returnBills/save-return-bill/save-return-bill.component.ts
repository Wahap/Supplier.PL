import { Component, OnInit, ViewContainerRef, Input, ViewChild, ElementRef, Output,EventEmitter } from '@angular/core';
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
import { Product } from '../../../shared/DTOs/product';

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
  products: Product[] = [];
  isDirty:boolean=false;
  billNumberIsValid: boolean = true;
  currentBillTotals: Totals = new Totals();
  currentBill: ReturnBill=new ReturnBill();
  deletedBillProducts: ReturnBillProduct[] = [];
  isBillSaving:boolean=false;
  @Output() onReturnBillSaved=new EventEmitter();
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
      this.currentBill.id=this.selectedBill.id;
      this.selectedCustomer = this.customers.find(x => x.id == this.selectedBill.customerId);
      this.selectedAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.addressId);
      this.deliveryAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.deliveryAddressId);
      let cd=new Date(this.selectedBill.createdDate);
      this.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
      let dd=new Date(this.selectedBill.deliveryDate);
      this.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
      this.billNumber = this.selectedBill.billNumber;
      this.selectedCustomer.extraDiscount = this.selectedBill.extraDiscount;//discount sync
      this.deletedBillProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentBillProducts();
      this.getProducts();
    }
    
  }

  mapSelectedBillProductsToCurrentBillProducts() {
    this.returnBillService.getReturnBillProducts(this.config.getReturnBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill.returnBillProducts=billProducts;
      this.calculateCurrentBillPrices();
    });
  }

  saveBill() {
    this.isBillSaving=true;
   
    if (this.currentBill.id == 0) {//Bill Updating...
     this.currentBill.isPaid=false;
    }
   
    this.currentBill.addressId = this.selectedAddress.id;
    this.currentBill.billNumber = this.billNumber;
    this.currentBill.customerId = this.selectedCustomer.id;
    this.currentBill.extraDiscount = this.selectedCustomer.extraDiscount;
    this.currentBill.createdDate = new Date(this.createdDate.getFullYear(),this.createdDate.getMonth(),this.createdDate.getDate(),8,0,0);
    this.currentBill.deliveryDate =new Date(this.deliveryDate.getFullYear(),this.deliveryDate.getMonth(),this.deliveryDate.getDate(),8,0,0);
    this.currentBill.deliveryAddressId = this.deliveryAddress.id;
    this.currentBill.billStatus = 1;
    this.currentBill.isActive = true;
   

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBillProducts.forEach(dltd => {
     
      this.currentBill.returnBillProducts.push(dltd);

    });

    this.returnBillService.saveReturnBill(this.config.saveReturnBillUrl, this.currentBill).subscribe(result => {
      this.isDirty=false;
      this.toastr.success("Fatura başarıyla kaydedildi..."); 
      this.isBillSaving=false;
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('thisMonthReturnBills');
      }
      else {//update waybill operation completed
        this.onReturnBillSaved.emit(result);
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
    this.productsService.getProducts(this.config.getProductsUrl, productListOptions).subscribe(items => {
     this.products=items.data;
      //this.fillBasketProducts();
      this.loading = false;
    });
  }

  increaseBillProduct(billProduct:ReturnBillProduct)
  {
    billProduct.numberOfPackage++;
    billProduct.status="edited";
    this.calculateCurrentBillPrices();
  }
  decreaseBillProduct(billProduct:ReturnBillProduct)
  {
    if(billProduct.numberOfPackage<=1)//delete from CurrentWaybill
    {
      let indis=this.currentBill.returnBillProducts.findIndex(x=>x.productId==billProduct.productId);
      this.currentBill.returnBillProducts.splice(indis,1);
      if(billProduct.id>0)
      {
        billProduct.status="deleted";
        this.deletedBillProducts.push(billProduct);
      }
      
    }
    else
    {
      billProduct.numberOfPackage--;
      billProduct.status="edited";
    }
    this.calculateCurrentBillPrices();
   
  }
  removeBillProduct(billProduct:ReturnBillProduct)
  {
    let indis=this.currentBill.returnBillProducts.findIndex(x=>x.productId==billProduct.productId);
    this.currentBill.returnBillProducts.splice(indis,1);
    if(billProduct.id>0)
      {
        billProduct.status="deleted";
        this.deletedBillProducts.push(billProduct);
      }
    this.calculateCurrentBillPrices();
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

  increase(product: Product) {
    product.package++;
    product.status = "edited";
    this.saveProductToCurrentBill(product);
  }
  decrease(product: Product) {

    if (product.package > 0)//prevent negative inputs
    {
      product.package--;
      product.status = "edited";
      this.saveProductToCurrentBill(product);
    }


    // this.getProductsInBasket();
  }
  removeProductToCurrentBill(product: Product) {
    product.package = 0;
    this.saveProductToCurrentBill(product);
  }
  setPackage(product: Product) {

    if (product.package > 0) {
      product.status = "edited";
      this.saveProductToCurrentBill(product);
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
  saveProductToCurrentBill(product: Product) {
    this.isDirty=true;
    let editedBillProduct = this.currentBill.returnBillProducts.find(x => x.productId == product.id);
    if (editedBillProduct != undefined && product.package < 1)//Delete product from currentBill
    {

      let index = this.currentBill.returnBillProducts.findIndex(item => item.productId == product.id);
      this.currentBill.returnBillProducts.splice(index, 1);
      if (this.selectedBill != null)//Update operation
      {
        editedBillProduct.status="deleted";
        this.deletedBillProducts.push(editedBillProduct);
      }

    }
    else if (editedBillProduct == undefined)//product will be added first time
    {
      let billProduct=new ReturnBillProduct();
      billProduct.id=0;
      billProduct.netSalePrice=product.netSalePrice;
      billProduct.numberOfPackage=product.package;
      billProduct.product=product;
      billProduct.productId=product.id;
      billProduct.purchasePrice=product.purchasePrice;
      billProduct.status="edited";
      billProduct.tax=product.tax;
      billProduct.unitsInPackage=product.unitsInPackage;
      billProduct.returnBillId=this.currentBill.id;
      
      this.currentBill.returnBillProducts.push(billProduct);
      //scroll bottom 
      this.billProductsContainer.nativeElement.scrollTop = this.billProductsContainer.nativeElement.scrollHeight;

    }
    else//product exist in waybill, update the package
    {
      editedBillProduct.netSalePrice=product.netSalePrice;
      editedBillProduct.numberOfPackage = product.package;
    }
    this.calculateCurrentBillPrices();
  }
  calculateCurrentBillPrices() { 
    this.currentBillTotals = new Totals();
    this.currentBill.returnBillProducts.forEach(billProduct => {
      let numberOfPieces = billProduct.numberOfPackage * billProduct.unitsInPackage;
      this.currentBillTotals.totalPackages += billProduct.numberOfPackage;
      this.currentBillTotals.totalPieces += numberOfPieces;
      this.currentBillTotals.totalNetPrice += numberOfPieces * billProduct.netSalePrice;
      this.currentBillTotals.totalTaxPrice += numberOfPieces * (billProduct.netSalePrice * billProduct.tax / 100);
      this.currentBillTotals.extraDiscount = (this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice) * this.selectedCustomer.extraDiscount / 100;
      this.currentBillTotals.discount = (this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice);
      this.currentBillTotals.totalGrossPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice - this.currentBillTotals.extraDiscount - this.currentBillTotals.discount;
    });
    this.currentBillTotals.totalItems = this.currentBill.returnBillProducts.length;
  }
  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }

}
