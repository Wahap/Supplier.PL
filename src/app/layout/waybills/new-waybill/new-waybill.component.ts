import { Component, OnInit, ViewContainerRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { ProductsService } from '../../products/products.service';
import { IConfig, ConfigService } from '../../../app.config';
import { WaybillProduct } from '../../../shared/DTOs/waybillProduct';
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
@Component({
  selector: 'app-new-waybill',
  templateUrl: './new-waybill.component.html',
  styleUrls: ['./new-waybill.component.scss']
})
export class NewWaybillComponent implements OnInit {
  config: IConfig;
  products: Product[] = [];
  currentWaybill:Waybill=new Waybill();
  customers: Customer[] = [];
  discountRates:DiscountRate[]=[];
  priceTypeId: number=1;
  selectedCustomer: Customer = new Customer();
  selectedDiscountRate:DiscountRate=new DiscountRate();
  selectedAddress: Address = new Address();
  deliveryAddress: Address = new Address();
  deletedWaybillProducts: WaybillProduct[] = [];
  createdDate: Date=new Date();//Default value
  deliveryDate: Date=new Date();
  productList: Product[] = [];
  loading: boolean;
  isNewRecord: boolean;
  productListCols: any[];
 
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

   
  }
  ngOnChanges() {
    if(this.selectedWayBill != null && this.customers.length>0)
    {
      this.currentWaybill.id=this.selectedWayBill.id;
      this.currentWaybill.convertedBillNumber=this.selectedWayBill.convertedBillNumber;
      this.currentWaybill.extraDiscount=this.selectedWayBill.extraDiscount;
      this.priceTypeId=this.selectedWayBill.priceTypeId==null?1:this.selectedWayBill.priceTypeId;
      this.selectedCustomer=this.customers.find(x=>x.id==this.selectedWayBill.customerId);
      this.selectedAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedWayBill.addressId);
      this.deliveryAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedWayBill.deliveryAddressId);
      let cd=new Date(this.selectedWayBill.createdDate);
      this.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
      let dd=new Date(this.selectedWayBill.deliveryDate);
      this.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
      this.selectedCustomer.extraDiscount=this.selectedWayBill.extraDiscount;//discount sync
      this.selectedDiscountRate=this.discountRates.find(x=>x.id==this.selectedWayBill.discountRateId);
      
      this.deletedWaybillProducts=[];
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
      this.currentWaybill.waybillProducts=waybillProducts;
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
    if(this.selectedCustomer.priceTypeId!=null)
    { 
      this.priceTypeId=this.selectedCustomer.priceTypeId;
    }
    this.currentWaybill.extraDiscount=this.selectedCustomer.extraDiscount;
    this.getProducts();
  }
  saveWaybill() {
    this.isWaybillSaving=true;
   
    if (this.selectedWayBill != null) {
      this.currentWaybill.id = this.selectedWayBill.id;
      
    }
   
   
    this.currentWaybill.addressId = this.selectedAddress.id;
    this.currentWaybill.customerId = this.selectedCustomer.id;
    this.currentWaybill.extraDiscount=this.selectedCustomer.extraDiscount;
    this.currentWaybill.priceTypeId=this.priceTypeId;//Which Price Type Used
    this.currentWaybill.createdDate =new Date(this.createdDate.getFullYear(),this.createdDate.getMonth(),this.createdDate.getDate(),8,0,0);
    this.currentWaybill.deliveryDate =new Date(this.deliveryDate.getFullYear(),this.deliveryDate.getMonth(),this.deliveryDate.getDate(),8,0,0);
    this.currentWaybill.deliveryAddressId = this.deliveryAddress.id;
    this.currentWaybill.waybillStatus = 1;
    this.currentWaybill.isActive = true;
    this.currentWaybill.discountRateId=this.selectedDiscountRate.id;
    this.currentWaybill.discountRate=null;//No need to create a new Discount rate
   

   //add also removed/deleted product with "deleted" flag/status
    this.deletedWaybillProducts.forEach(dltd => {
      this.currentWaybill.waybillProducts.push(dltd);
    });

    this.waybillService.saveWaybill(this.config.saveWaybillUrl, this.currentWaybill).subscribe((result:Waybill )=> {
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
  

  onPriceChange(basketProduct:BasketProduct)
  {
    basketProduct.status="edited";
  }

  onTaxChange(basketProduct:BasketProduct)
  {
    basketProduct.status="edited";
  }
  increase(product: Product) {
   
    product.package++;
    this.saveProductToCurrentWaybill(product);
  

}
setPackage(product: Product) {

  if (product.package > 0) {
    this.saveProductToCurrentWaybill(product);
  }


}
  decrease(product: Product) {

    if (product.package > 0)//prevent negative inputs
    {
      product.package--;
      this.saveProductToCurrentWaybill(product);
    }


    // this.getProductsInBasket();
  }
 
  removeCurrentWaybill() {
    // localStorage.removeItem("currentWaybill");
    this.currentWaybill.waybillProducts = [];
  }

  saveProductToCurrentWaybill(product: Product) {
    this.isDirty=true;
    let editedWaybillProduct = this.currentWaybill.waybillProducts.find(x => x.productId == product.id);
    if (editedWaybillProduct != undefined && product.package < 1)//Delete product from currentWayBill
    {
      
      let index = this.currentWaybill.waybillProducts.findIndex(item => item.productId == product.id);
      this.currentWaybill.waybillProducts.splice(index, 1);
      if(editedWaybillProduct.id>0)//Delete operation
      {
      
        editedWaybillProduct.status="deleted";
        this.deletedWaybillProducts.push(editedWaybillProduct);
      
      }
      
    }
    else if (editedWaybillProduct == undefined)//product will be added first time
    {
      let waybillProduct=new WaybillProduct();
      waybillProduct.id=0;
      waybillProduct.netSalePrice=product.netSalePrice;
      waybillProduct.numberOfPackage=product.package;
      waybillProduct.product=product;
      waybillProduct.productId=product.id;
      waybillProduct.purchasePrice=product.purchasePrice;
      waybillProduct.status="edited";
      waybillProduct.tax=product.tax;
      waybillProduct.unitsInPackage=product.unitsInPackage;
      waybillProduct.waybillId=this.currentWaybill.id;
      this.currentWaybill.waybillProducts.push(waybillProduct);
        //scroll bottom 
        this.wayBillProductsContainer.nativeElement.scrollTop = this.wayBillProductsContainer.nativeElement.scrollHeight;
    }
    else//product exist in waybill, update the package
    {
      editedWaybillProduct.numberOfPackage = product.package;
      editedWaybillProduct.netSalePrice=product.netSalePrice;
      editedWaybillProduct.status="edited";
    }
    this.calculateCurrentWaybillPrices();
  }
  increaseWaybillProduct(waybillProduct:WaybillProduct)
  {
    waybillProduct.numberOfPackage++;
    waybillProduct.status="edited";
    this.calculateCurrentWaybillPrices();
  }
  decreaseWaybillProduct(waybillProduct:WaybillProduct)
  {
    if(waybillProduct.numberOfPackage<=1)//delete from CurrentWaybill
    {
      let indis=this.currentWaybill.waybillProducts.findIndex(x=>x.productId==waybillProduct.productId);
      this.currentWaybill.waybillProducts.splice(indis,1);
      if(waybillProduct.id>0)
      {
        waybillProduct.status="deleted";
        this.deletedWaybillProducts.push(waybillProduct);
      }
      
    }
    else
    {
      waybillProduct.numberOfPackage--;
      waybillProduct.status="edited";
    }
    this.calculateCurrentWaybillPrices();
   
  }
  removeWaybillProduct(waybillProduct:WaybillProduct)
  {
    let indis=this.currentWaybill.waybillProducts.findIndex(x=>x.productId==waybillProduct.productId);
    this.currentWaybill.waybillProducts.splice(indis,1);
    if(waybillProduct.id>0)
      {
        waybillProduct.status="deleted";
        this.deletedWaybillProducts.push(waybillProduct);
      }
    this.calculateCurrentWaybillPrices();
  }
  calculateCurrentWaybillPrices()
  {
    this.currentWaybillTotals=new Totals();
    this.currentWaybill.waybillProducts.forEach(wbProduct=>{  
      let pieces = wbProduct.unitsInPackage * wbProduct.numberOfPackage;
      let subNetPrice = pieces * wbProduct.netSalePrice;
      this.currentWaybillTotals.totalPackages += wbProduct.numberOfPackage;
      this.currentWaybillTotals.totalPieces += pieces;
      this.currentWaybillTotals.subNetTotalPrice += subNetPrice;//net ara toplam
                                           //Calculate total tax after discount
      this.currentWaybillTotals.totalTaxPrice += (subNetPrice - (subNetPrice * this.currentWaybill.extraDiscount / 100)) * wbProduct.tax / 100;
    });
    this.currentWaybillTotals.extraDiscount = this.currentWaybillTotals.subNetTotalPrice * this.currentWaybill.extraDiscount / 100;//total discount
    this.currentWaybillTotals.totalNetPrice = this.currentWaybillTotals.subNetTotalPrice - this.currentWaybillTotals.extraDiscount;//total net price
    this.currentWaybillTotals.totalGrossPrice = this.currentWaybillTotals.totalNetPrice + this.currentWaybillTotals.totalTaxPrice;
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
    
      this.products = items;
      //this.fillBasketProducts();
      this.loading = false;
    },error=>{
      this.toastr.error("Ürünler Getirilirken Bir Hata Oluştu...");
    });
  }
  changeStatus(waybillProduct:WaybillProduct)
  {
    waybillProduct.status='edited';
    this.calculateCurrentWaybillPrices();
  }
  filterProductsByCategory(filteredCategoryId, product:Product) {
    
    if (filteredCategoryId == undefined || filteredCategoryId == 0) {
      return true;
    }
    else if (product.category == null) {
      return false;
    }
   
    else {
      return product.categoryId == filteredCategoryId;
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
