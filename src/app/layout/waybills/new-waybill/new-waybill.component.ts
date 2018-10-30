import { Component, OnInit, ViewContainerRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { ProductsService } from '../../products/products.service';
import { IConfig, ConfigService } from '../../../app.config';
import { WaybillProduct } from '../../../shared/DTOs/waybillProduct';
import { retry } from 'rxjs/operator/retry';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { Address } from '../../../shared/DTOs/address';
import { WaybillService } from '../waybill.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { Product } from '../../../shared/DTOs/product';
import { Router } from '@angular/router';
import { ProductListOptions } from '../../../shared/DTOs/productListOptions';
import { Totals } from '../../../shared/DTOs/totals';
import { DiscountRate } from '../../../shared/DTOs/discountRate';
import { CommonService } from '../../../shared/common.service';
import { Category } from '../../../shared/DTOs/category';
import { Log } from '../../../shared/DTOs/log';
@Component({
  selector: 'app-new-waybill',
  templateUrl: './new-waybill.component.html',
  styleUrls: ['./new-waybill.component.scss']
})
export class NewWaybillComponent implements OnInit {
  config: IConfig;
  basketProducts: BasketProduct[] = [];
  currentWaybill: BasketProduct[] = [];
  customers: Customer[] = [];
  discountRates:DiscountRate[]=[];
  priceTypeId: number=1;
  selectedCustomer: Customer = new Customer();
  selectedDiscountRate:DiscountRate=new DiscountRate();
  selectedAddress: Address = new Address();
  deliveryAddress: Address = new Address();
  deletedBasketProducts: BasketProduct[] = [];
  createdDate: Date=new Date();//Default value
  deliveryDate: Date=new Date();
  productList: Product[] = [];
  loading: boolean;
  lastWaybill: Waybill;
  isNewRecord: boolean;
  productListCols: any[];
  convertedBillNumber:number;
 
currentWaybillTotals:Totals=new Totals();
categories: Category[] = [];
isWaybillSaving:boolean=false;
isDirty:boolean=false;//check is there a unsaved changes
@ViewChild('wayBillProductsContainer') private wayBillProductsContainer: ElementRef;
  @Input()
  selectedWayBill: Waybill;
  @Output() onWaybillSaved=new EventEmitter();

  constructor(private customerService: CustomersService,private commonService:CommonService, public toastr: ToastsManager, vcr: ViewContainerRef, private waybillService: WaybillService, private productsService: ProductsService, private configService: ConfigService, public dialog: MatDialog, public router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loading = false;
  
    //this.isNewRecord = true;
  }
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    
    this.productListCols = [
      // { field: 'barcodeOfProduct', header: 'Barkod' },
      // { field: 'orderNumber', header: 'S.No' },
      { field: 'productName', header: 'Ürün' },
      { field: 'netSalePrice', header: 'Fiyat' },
      { field: 'package', header: 'Koli' }
    ];

   
    //this.getProducts();
    //  this.fillBasketProducts();
    this.fillCustomers();
    this.fillCategories();
    this.fillDiscountRates();//Skonto

    //this.setLastWaybill();
  }
  ngOnChanges() {
    if(this.selectedWayBill != null && this.customers.length>0)
    {
      let a=this.selectedWayBill;
      this.selectedCustomer=this.customers.find(x=>x.id==this.selectedWayBill.customerId);
      this.selectedAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedWayBill.addressId);
      this.deliveryAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedWayBill.deliveryAddressId);
      let cd=new Date(this.selectedWayBill.createdDate);
      this.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
      let dd=new Date(this.selectedWayBill.deliveryDate);
      this.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
      this.selectedCustomer.extraDiscount=this.selectedWayBill.extraDiscount;//discount sync
      this.selectedDiscountRate=this.discountRates.find(x=>x.id==this.selectedWayBill.discountRateId);
      this.deletedBasketProducts=[];//reset at every new waybill selection
      this.convertedBillNumber=this.selectedWayBill.convertedBillNumber;
      this.mapSelectedWaybillProductsToCurrentWaybillProducts();
      this.getProducts();
    }
    
    // if (this.selectedWayBill != null) {
    //   this.getWayBillById(this.selectedWayBill.id);
    //   this.isNewRecord = false;
    // }
  }
 
  mapSelectedWaybillProductsToCurrentWaybillProducts()
  {
    this.waybillService.getWaybillProducts(this.config.getWaybillProductsUrl,this.selectedWayBill).subscribe(waybillProducts=>{
      this.currentWaybill=waybillProducts.map((waybillProduct:WaybillProduct)=>{
        let basketProduct=new BasketProduct();
        basketProduct.id=waybillProduct.id;
        basketProduct.package=waybillProduct.numberOfPackage;
        basketProduct.product=waybillProduct.product;
        basketProduct.product.netSalePrice=waybillProduct.netSalePrice;
        return basketProduct;
      });
      this.calculateCurrentWaybillPrices();
    });
  }

  onCustomerSelect()
  {
    this.selectedAddress=this.selectedCustomer.addresses[0];
    this.deliveryAddress=this.selectedCustomer.addresses[0];
    if(this.selectedCustomer.discountRateId!=null)
    {
      this.selectedDiscountRate=this.discountRates.find(x=>x.id==this.selectedCustomer.discountRateId);
    }
    this.getProducts();
  }
  saveWaybill() {
    this.isWaybillSaving=true;
    let waybill: Waybill = new Waybill();
    if (this.selectedWayBill != null) {
      waybill.id = this.selectedWayBill.id;
      
    }
    // else if (this.lastWaybill != null) {
    //   waybill.id = this.lastWaybill.id;
    // }
    waybill.convertedBillNumber=this.convertedBillNumber;
    waybill.addressId = this.selectedAddress.id;
    waybill.customerId = this.selectedCustomer.id;
    waybill.extraDiscount=this.selectedCustomer.extraDiscount;
    
    waybill.createdDate =new Date(this.createdDate.getFullYear(),this.createdDate.getMonth(),this.createdDate.getDate(),8,0,0);
    waybill.deliveryDate =new Date(this.deliveryDate.getFullYear(),this.deliveryDate.getMonth(),this.deliveryDate.getDate(),8,0,0);
    waybill.deliveryAddressId = this.deliveryAddress.id;
    waybill.waybillStatus = 1;
    waybill.isActive = true;
    waybill.discountRateId=this.selectedDiscountRate.id;
    waybill.discountRate=null;//No need to create a new Discount rate
    this.currentWaybill.forEach(basketProduct => {
      let waybillProduct = new WaybillProduct();
      waybillProduct.id = basketProduct.id;
      waybillProduct.waybillId = waybill.id;
      waybillProduct.numberOfPackage = basketProduct.package;
      waybillProduct.netSalePrice=basketProduct.product.netSalePrice;
      waybillProduct.purchasePrice=basketProduct.product.purchasePrice;
      waybillProduct.tax=basketProduct.product.tax;
      waybillProduct.productId = basketProduct.product.id;
      waybillProduct.status = basketProduct.status;
      waybill.waybillProducts.push(waybillProduct);
    });

   // add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedWayBillProduct = new WaybillProduct();
      deletedWayBillProduct.id = dltd.id;
      deletedWayBillProduct.status = 'deleted';
      waybill.waybillProducts.push(deletedWayBillProduct);

    });

    this.waybillService.saveWaybill(this.config.saveWaybillUrl, waybill).subscribe((result:Waybill )=> {
      this.toastr.success("irsaliye başarıyla kaydedildi...");
      this.isWaybillSaving=false;
      this.isDirty=false;
      if(this.selectedWayBill==null)//new waybill operation completed
      {
        this.router.navigateByUrl('thisMonthWaybills');
      }
      else{//update waybill operation completed
        this.onWaybillSaved.emit(result);
      }
     //also log process
      // this.commonService.getIpAddress(this.config.getIpAddressUrl).subscribe(response=>{
      //   console.log(response);
      //   let log=new Log();
      //   log.ipAddress=response.ip;
      //   log.DocumentType=2;
      //   log.DocumentId=result.id;
      //   log.identifier="db";
      //   log.logDate=new Date();
      //   log.operation=waybill.waybillProducts.map(x=>x.id).join('-');
      //   this.commonService.createLog(this.config.createLogUrl,log).subscribe(response=>{});
      // });

    },error=>{
      this.toastr.error("irsaliye Kaydedilirken bir hata oluştu...");
    });
  }

  fillCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result => {
      this.customers = result;
    },error=>{
      this.toastr.error("Müşteriler Getirilirken Bir Hata Oluştu...");
    });
  }

  fillDiscountRates() {
    this.commonService.getAllDiscountRates(this.config.getAllDiscountRatesUrl, null).subscribe(result => {
      this.discountRates = result;
      if(result.length>0 && this.selectedWayBill==null)
      {
        this.selectedDiscountRate=result[0];
      }
      
    },error=>{
      this.toastr.error("iskonto Oranları Getirilirken Bir Hata Oluştu...");
    });
  }
  increase(basketProduct: BasketProduct) {
   
      basketProduct.package++;
      basketProduct.status = "edited";
      this.saveProductToCurrentWaybill(basketProduct);
    

  }
  setPackage(basketProduct: BasketProduct, type) {

    if (basketProduct.package > 0) {
      basketProduct.status = "edited";
      this.saveProductToCurrentWaybill(basketProduct);
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

  decrease(basketProduct: BasketProduct) {

    if (basketProduct.package > 0)//prevent negative inputs
    {
      basketProduct.package--;
      basketProduct.status = "edited";
      this.saveProductToCurrentWaybill(basketProduct);
    }


    // this.getProductsInBasket();
  }
  removeProductToCurrentWaybill(waybillProduct:BasketProduct)
  {
    waybillProduct.package=0;
    this.saveProductToCurrentWaybill(waybillProduct);
  }
  removeCurrentWaybill() {
    // localStorage.removeItem("currentWaybill");
    this.currentWaybill = [];
  }

  saveProductToCurrentWaybill(basketProduct: BasketProduct) {
    this.isDirty=true;
    let editedBasketProduct = this.currentWaybill.find(x => x.product.id == basketProduct.product.id);
    if (editedBasketProduct != undefined && basketProduct.package < 1)//Delete product from currentWayBill
    {
      
      let index = this.currentWaybill.findIndex(item => item.product.id == basketProduct.product.id);
      this.currentWaybill.splice(index, 1);
      if(this.selectedWayBill!=null && basketProduct.product.id!=0)//Delete operation
      {
        this.deletedBasketProducts.push(basketProduct);
      }
      
    }
    else if (editedBasketProduct == undefined)//product will be added first time
    {
      this.currentWaybill.push(basketProduct);
        //scroll bottom 
        this.wayBillProductsContainer.nativeElement.scrollTop = this.wayBillProductsContainer.nativeElement.scrollHeight;
    }
    else//product exist in waybill, update the package
    {
      editedBasketProduct.package = basketProduct.package;
    }
    this.calculateCurrentWaybillPrices();
  }

  calculateCurrentWaybillPrices()
  {
    this.currentWaybillTotals=new Totals();
    this.currentWaybill.forEach(basketProduct=>{  
      let numberOfPieces=basketProduct.package*basketProduct.product.unitsInPackage;
      this.currentWaybillTotals.totalPackages+=basketProduct.package;
      this.currentWaybillTotals.totalPieces+=numberOfPieces;
      this.currentWaybillTotals.totalNetPrice+=numberOfPieces*basketProduct.product.netSalePrice;
      this.currentWaybillTotals.totalTaxPrice+=numberOfPieces*(basketProduct.product.netSalePrice*basketProduct.product.tax/100);
      this.currentWaybillTotals.extraDiscount=(this.currentWaybillTotals.totalNetPrice+this.currentWaybillTotals.totalTaxPrice)*this.selectedCustomer.extraDiscount/100;
      this.currentWaybillTotals.discount=(this.currentWaybillTotals.totalNetPrice+this.currentWaybillTotals.totalTaxPrice)*this.selectedDiscountRate.rate/100;
      this.currentWaybillTotals.totalGrossPrice=this.currentWaybillTotals.totalNetPrice+this.currentWaybillTotals.totalTaxPrice-this.currentWaybillTotals.extraDiscount-this.currentWaybillTotals.discount;
    });
    this.currentWaybillTotals.totalItems=this.currentWaybill.length;
  }


  getProductFromCurrentWaybill(id: number) {
    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in waybill
    {
      if (this.currentWaybill[i].product.id == id) {
        return this.currentWaybill[i];
      }
    }
    return null;
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
    },error=>{
      this.toastr.error("Ürünler Getirilirken Bir Hata Oluştu...");
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


  fillCategories() {
    this.commonService.getCategories(this.config.getCategoriesUrl, null).subscribe(categories => {
      this.categories = categories;


    },error=>{
      this.toastr.error("Kategoriler Getirilirken Bir Hata Oluştu...");
    });
  }
  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }
  clearProducts() {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      width: '50%',
      data: { title: "irsaliyeyi sıfırlamak istiyor musunuz?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.removeCurrentWaybill();
      }
    });
  }
}
