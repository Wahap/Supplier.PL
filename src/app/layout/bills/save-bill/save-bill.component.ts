import { Component, OnInit, ViewContainerRef, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
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
import { Category } from '../../../shared/DTOs/category';
import { Log } from '../../../shared/DTOs/log';
import { WareHouse } from '../../../shared/DTOs/wareHouse';
import { StockService } from '../../stock/stock.service';
@Component({
  selector: 'app-save-bill',
  templateUrl: './save-bill.component.html',
  styleUrls: ['./save-bill.component.scss']
})
export class SaveBillComponent implements OnInit {
  config: IConfig;
  loading: boolean;  
  products: Product[] = [];
  wareHouses:WareHouse[]=[];
  primaryWareHouseId:number;
  productList: Product[] = [];
  currentBill: Bill=new Bill();
  deletedBillProducts: BillProduct[] = [];
  customers: Customer[] = [];
  selectedCustomer: Customer = new Customer();
  selectedAddress: Address = new Address();
  deliveryAddress: Address = new Address();
  createdDate: Date = new Date(); 
  deliveryDate: Date = new Date();
  billNumberIsValid: boolean = true;
  discountRates: DiscountRate[] = [];
  selectedDiscountRate: DiscountRate = new DiscountRate();
  lastBill: Bill;
  priceTypeId: number=1;
  productListCols: any[];
  currentBillTotals: Totals = new Totals();
  categories: Category[] = [];
  isBillSaving:boolean=false;
  isDirty:boolean=false;
  rowNumber=0;
  filteredCategoryId:number=0;
  @Output() onBillSaved=new EventEmitter();
  @ViewChild('billProductsContainer') private billProductsContainer: ElementRef;
  @Input()
  selectedBill: Bill;
  constructor(private stockService:StockService, private customerService: CustomersService, private commonService: CommonService, public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService, private productsService: ProductsService, private configService: ConfigService, public dialog: MatDialog, public router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loading = false;
    
  }
 
  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillCustomers();
    this.fillDiscountRates();//Skonto
    this.fillCategories();
    this.getNextBillNumber();
    this.getWareHouses();
    this.productListCols = [
      { field: 'barcodeOfProduct', header: 'Barkod' },
      // { field: 'orderNumber', header: 'S.No' },
      { field: 'productName', header: 'Ürün' },
      { field: 'netSalePrice', header: 'Fiyat' },
      { field: 'package', header: 'Koli' }
    ];


  }

  ngOnChanges() {
    if (this.selectedBill != null && this.customers.length > 0) {
      console.log(this.selectedBill);
      this.currentBill.id=this.selectedBill.id;
      this.currentBill.waybillId = this.selectedBill.waybillId;
      this.currentBill.billNumber = this.selectedBill.billNumber;
      this.currentBill.extraDiscount=this.selectedBill.extraDiscount;
      this.selectedCustomer = this.customers.find(x => x.id == this.selectedBill.customerId);
      this.priceTypeId=this.selectedBill.priceTypeId==null?1:this.selectedBill.priceTypeId;
      this.selectedAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.addressId);
      this.deliveryAddress = this.selectedCustomer.addresses.find(x => x.id == this.selectedBill.deliveryAddressId);
      let cd=new Date(this.selectedBill.createdDate);
      this.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
      let dd=new Date(this.selectedBill.deliveryDate);
      this.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
      this.selectedDiscountRate = this.discountRates.find(x => x.id == this.selectedBill.discountRateId);
      this.deletedBillProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentBillProducts();
      this.getProducts();
    }

  }

  mapSelectedBillProductsToCurrentBillProducts() {
    this.billService.getBillProducts(this.config.getBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill.billProducts = billProducts; 
      this.rowNumber=billProducts[billProducts.length-1].rowNumber;
      this.calculateCurrentBillPrices();
    },error=>{
      this.toastr.error("Faturanın Ürünleri Getirilirken Bir Hata Meydana Geldi...");
    });
  }
  getWareHouses() {
    this.stockService.getWareHouses(this.config.getWareHousesUrl, null).subscribe(result => {
      this.wareHouses = result;
      let primary=this.wareHouses.find(x=>x.isPrimary==true);
      this.primaryWareHouseId=primary==undefined?result[0].id:primary.id;
     
    },error=>{
      this.toastr.error("Depolar Getirilirken Bir Hata Oluştu...");
    });
  }
  getNextBillNumber() {
    this.billService.getNextBillNumber(this.config.getNextBillNumberUrl, null).subscribe(billNumber => {
      this.currentBill.billNumber = billNumber;
    },error=>{
      this.toastr.error("Fatura Numarası Getirilirken Bir Hata Meydana Geldi...");
    });

  }

  fillDiscountRates() {
    this.commonService.getAllDiscountRates(this.config.getAllDiscountRatesUrl, null).subscribe(discountRates => {
      this.discountRates = discountRates;
      if (discountRates.length > 0)//prevent adding null DiscountId to bill
      {
        this.selectedDiscountRate = discountRates[0];
      }

    },error=>{
      this.toastr.error("iskontolar Getirilirken Bir Hata Meydana Geldi...");
    });  
  }

  fillCategories() {
    this.commonService.getCategories(this.config.getCategoriesUrl, null).subscribe(categories => {
      this.categories = categories;


    },error=>{
      this.toastr.error("Kategoriler Getirilirken Bir Hata Meydana Geldi...");
    });
  }

 
  saveBill() {
    this.isBillSaving=true;
    
    this.currentBill.grossPrice=this.currentBillTotals.totalGrossPrice;
    if (this.currentBill.id==0) {//Bill Updating...
      this.currentBill.isPaid = false;
    }
   
    
    this.currentBill.addressId = this.selectedAddress.id;
    this.currentBill.priceTypeId=this.priceTypeId;
    this.currentBill.customerId = this.selectedCustomer.id;
    this.currentBill.extraDiscount = this.currentBill.extraDiscount;
    this.currentBill.createdDate = new Date(this.createdDate.getFullYear(),this.createdDate.getMonth(),this.createdDate.getDate(),8,0,0);
    this.currentBill.deliveryDate =new Date(this.deliveryDate.getFullYear(),this.deliveryDate.getMonth(),this.deliveryDate.getDate(),8,0,0);
    this.currentBill.deliveryAddressId = this.deliveryAddress.id;
    this.currentBill.billStatus = 1;
    this.currentBill.isActive = true;
    this.currentBill.discountRateId = this.selectedDiscountRate.id;
    this.currentBill.discountRate = null;//No need to create a new Discount rate
   

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBillProducts.forEach(dltd => {
     
      this.currentBill.billProducts.push(dltd);

    });

    this.billService.saveBill(this.config.saveBillUrl, this.currentBill).subscribe((result:Bill) => {
      this.isDirty=false;
      this.toastr.success("Fatura başarıyla kaydedildi...");
      this.isBillSaving=false;
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('thisMonthBills');
      }
      else {//update waybill operation completed
        result.discountRate=this.discountRates.find(x=>x.id==result.discountRateId);
        this.onBillSaved.emit(result);
      }
      //also log saving process
      // this.commonService.getIpAddress(this.config.getIpAddressUrl).subscribe(response=>{
      //   console.log(response);
      //   let log=new Log();
      //   log.ipAddress=response.ip;
      //   log.DocumentType=1;
      //   log.DocumentId=result.id;
      //   log.identifier="db";
      //   log.logDate=new Date();
      //   log.operation=bill.billProducts.map(x=>x.id).join('-');
      //   this.commonService.createLog(this.config.createLogUrl,log).subscribe(response=>{});
      // });
     

    },error=>{
      this.toastr.error("Fatura Kaydedilirken Bir Hata Meydana Geldi...");
    }); 
  }
  onBillNumberChange() {
    if (this.currentBill.billNumber > 0) {
      let bill = new Bill();
      if (this.selectedBill != null) {
        bill.id = this.selectedBill.id;
      }
      bill.billNumber = this.currentBill.billNumber;
      this.billService.checkBillNumberIsValid(this.config.checkBillNumberIsValidUrl, bill).subscribe((isValid) => {
        this.billNumberIsValid = isValid;
      });
    }

  }
  onCustomerSelect() {
    this.selectedAddress = this.selectedCustomer.addresses[0];
    this.deliveryAddress = this.selectedCustomer.addresses[0];
    if(this.selectedCustomer.discountRateId!=null)
    {
      this.selectedDiscountRate=this.discountRates.find(x=>x.id==this.selectedCustomer.discountRateId);
    }
    if(this.selectedCustomer.priceTypeId!=null)
    { 
      this.priceTypeId=this.selectedCustomer.priceTypeId;
    }
    this.currentBill.extraDiscount=this.selectedCustomer.extraDiscount;
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
     
      this.products = items;
      //this.fillBasketProducts();
      this.loading = false;
    },error=>{
      this.toastr.error("Ürünler Getirilirken Bir Hata Meydana Geldi...");
    });
  }
  changeStatus(billProduct:BillProduct)
  {
    billProduct.status='edited';
    this.calculateCurrentBillPrices();
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

  increaseBillProduct(billProduct:BillProduct)
  {
    billProduct.numberOfPackage++;
    billProduct.status="edited";
    this.products.find(x=>x.id==billProduct.productId).package=billProduct.numberOfPackage;//sync packages
    
    this.calculateCurrentBillPrices();
  }
  decreaseBillProduct(billProduct:BillProduct)
  {
    if(billProduct.numberOfPackage<=1)//delete from CurrentWaybill
    {
      let indis=this.currentBill.billProducts.findIndex(x=>x.productId==billProduct.productId);
      this.currentBill.billProducts.splice(indis,1);
      if(billProduct.id>0)
      {
        billProduct.status="deleted";
        this.deletedBillProducts.push(billProduct);
      }
      this.products.find(x=>x.id==billProduct.productId).package=0;//sync packages
    }
    else
    {
      billProduct.numberOfPackage--;
      billProduct.status="edited";
      this.products.find(x=>x.id==billProduct.productId).package=billProduct.numberOfPackage;//sync packages
    }
    this.calculateCurrentBillPrices();
   
  }
  removeBillProduct(billProduct:BillProduct)
  {
    let indis=this.currentBill.billProducts.findIndex(x=>x.productId==billProduct.productId);
    this.currentBill.billProducts.splice(indis,1);
    this.products.find(x=>x.id==billProduct.productId).package=0;//sync packages
    if(billProduct.id>0)
      {
        billProduct.status="deleted";
        this.deletedBillProducts.push(billProduct);
      }
    this.calculateCurrentBillPrices();
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
    let editedBillProduct = this.currentBill.billProducts.find(x => x.productId == product.id);
    if (editedBillProduct != undefined && product.package < 1)//Delete product from currentBill
    {

      let index = this.currentBill.billProducts.findIndex(item => item.productId == product.id);
      this.currentBill.billProducts.splice(index, 1);
      if (this.selectedBill != null)//Update operation
      {
        editedBillProduct.status="deleted";
        this.deletedBillProducts.push(editedBillProduct);
      }

    }
    else if (editedBillProduct == undefined)//product will be added first time
    {
      this.rowNumber++;
      let billProduct=new BillProduct();
      billProduct.id=0;
      billProduct.wareHouseId=this.primaryWareHouseId;
      billProduct.rowNumber=this.rowNumber;
      billProduct.netSalePrice=product.netSalePrice;
      billProduct.numberOfPackage=product.package;
      billProduct.product=product;
      billProduct.productId=product.id;
      billProduct.purchasePrice=product.purchasePrice;
      billProduct.status="edited";
      billProduct.tax=product.tax;
      billProduct.unitsInPackage=product.unitsInPackage;
      billProduct.billId=this.currentBill.id;
      
      this.currentBill.billProducts.push(billProduct);
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

  calculateCurrentBillPrices()
  {
    this.currentBillTotals=new Totals();
    this.currentBill.billProducts.forEach(bProduct=>{  
      let pieces = bProduct.unitsInPackage * bProduct.numberOfPackage;
      let subNetPrice = pieces * bProduct.netSalePrice;
      this.currentBillTotals.totalPackages += bProduct.numberOfPackage;
      this.currentBillTotals.totalPieces += pieces;
      this.currentBillTotals.subNetTotalPrice += subNetPrice;//net ara toplam
                                           //Calculate total tax after discount
      this.currentBillTotals.totalTaxPrice += (subNetPrice - (subNetPrice * this.currentBill.extraDiscount / 100)) * bProduct.tax / 100;
    });
    this.currentBillTotals.extraDiscount = this.currentBillTotals.subNetTotalPrice * this.currentBill.extraDiscount / 100;//total discount
    this.currentBillTotals.totalNetPrice = this.currentBillTotals.subNetTotalPrice - this.currentBillTotals.extraDiscount;//total net price
    this.currentBillTotals.subGrossTotalPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice;
    this.currentBillTotals.discount=(this.currentBillTotals.subGrossTotalPrice)*this.selectedDiscountRate.rate/100;
  this.currentBillTotals.totalGrossPrice=this.currentBillTotals.subGrossTotalPrice-this.currentBillTotals.discount;
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

fillCustomers() {
  this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result => {
    this.customers = result;
  },error=>{
    this.toastr.error("Müşteriler Getirilirken Bir Hata Meydana Geldi...");
  });
}


windowsHeight() {
  return (window.screen.height * 0.5) + "px";
}

}
