import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, ViewContainerRef } from '@angular/core';
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
import { Product } from '../../../shared/DTOs/product';
import { WareHouse } from '../../../shared/DTOs/wareHouse';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-save-vendor-bill',
  templateUrl: './save-vendor-bill.component.html',
  styleUrls: ['./save-vendor-bill.component.scss']
})
export class SaveVendorBillComponent implements OnInit {
  suppliers: Supplier[] = [];
  wareHouses:WareHouse[]=[];
  primaryWareHouseId:number;
  selectedSupplier:Supplier;
  config: IConfig;
  billDate: Date = new Date();
  products: Product[] = [];
  productListCols: any[];
  loading: boolean;  
  categories: Category[] = [];
  currentBillTotals: Totals = new Totals();
  currentBill: VendorBill=new VendorBill();
  deletedBillProducts: VendorBillProduct[] = [];
  isBillSaving:boolean=false;
  billNumber: number;
  rowNumber=0;
  @Output() onBillSaved=new EventEmitter();
  @ViewChild('billProductsContainer') private billProductsContainer: ElementRef;
  @Input()
  selectedBill: VendorBill;
  constructor(private vendorBillService:VendorBillService,private stockService:StockService, private commonService: CommonService,private configService: ConfigService,private productsService:ProductsService, public toastr: ToastsManager,vcr: ViewContainerRef,public router: Router) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config=this.configService.getAppConfig();
    this.fillSuppliers();
    this.fillCategories();
    this.getProducts();
    this.getWareHouses();
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

     this.currentBill.id=this.selectedBill.id;
      this.billDate = new Date(this.selectedBill.billDate);
      this.selectedSupplier = this.suppliers.find(x => x.id == this.selectedBill.supplierId);
      this.billNumber = this.selectedBill.billNumber;
      let cd=new Date(this.selectedBill.billDate);
      this.billDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
      this.deletedBillProducts = [];//reset at every new waybill selection
      this.mapSelectedBillProductsToCurrentBillProducts();
    }

  }

  mapSelectedBillProductsToCurrentBillProducts() {
    this.vendorBillService.getVendorBillProducts(this.config.getVendorBillProductsUrl, this.selectedBill).subscribe(billProducts => {
      this.currentBill.vendorBillProducts=billProducts;
      this.rowNumber=billProducts[billProducts.length-1].rowNumber;
      this.calculateCurrentBillPrices();
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
  saveBill() {
    this.isBillSaving=true;
 
    if (this.currentBill.id ==0) {//Bill Updating...
      this.currentBill.isPaid=false;
    }
    
    this.currentBill.billNumber = this.billNumber;
    this.currentBill.supplierId = this.selectedSupplier.id;
    this.currentBill.billDate = new Date(this.billDate.getFullYear(),this.billDate.getMonth(),this.billDate.getDate(),8,0,0);
   
   

    // add also removed/deleted product with "deleted" flag/status
    this.deletedBillProducts.forEach(dltd => {
     
      this.currentBill.vendorBillProducts.push(dltd);

    });

    this.vendorBillService.saveVendorBill(this.config.saveVendorBillUrl, this.currentBill).subscribe(result => {
      this.toastr.success("Fatura başarıyla kaydedildi...");
      this.isBillSaving=false;
      if (this.selectedBill == null)//new bill operation completed
      {
        this.router.navigateByUrl('thisMonthVendorBills');
      }
      else {//update waybill operation completed
        this.onBillSaved.emit(result);
      }


    },error=>{
      this.toastr.error("Geliş Faturası Kaydedilirken Hata  meydana geldi");
    });
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
  increaseBillProduct(billProduct:VendorBillProduct)
  {
    billProduct.numberOfPackage++;
    billProduct.status="edited";
    this.calculateCurrentBillPrices();
  }
  decreaseBillProduct(billProduct:VendorBillProduct)
  {
    if(billProduct.numberOfPackage<=1)//delete from CurrentWaybill
    {
      let indis=this.currentBill.vendorBillProducts.findIndex(x=>x.productId==billProduct.productId);
      this.currentBill.vendorBillProducts.splice(indis,1);
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
  removeBillProduct(billProduct:VendorBillProduct)
  {
    let indis=this.currentBill.vendorBillProducts.findIndex(x=>x.productId==billProduct.productId);
    this.currentBill.vendorBillProducts.splice(indis,1);
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

  saveProductToCurrentBill(product: Product) {
   
    let editedBillProduct = this.currentBill.vendorBillProducts.find(x => x.productId == product.id);
    if (editedBillProduct != undefined && product.package < 1)//Delete product from currentBill
    {

      let index = this.currentBill.vendorBillProducts.findIndex(item => item.productId == product.id);
      this.currentBill.vendorBillProducts.splice(index, 1);
      if (this.selectedBill != null)//Update operation
      {
        editedBillProduct.status="deleted";
        this.deletedBillProducts.push(editedBillProduct);
      }

    }
    else if (editedBillProduct == undefined)//product will be added first time
    {
      this.rowNumber++;
      let billProduct=new VendorBillProduct();
      billProduct.id=0;
     billProduct.wareHouseId=this.primaryWareHouseId;
     billProduct.rowNumber=this.rowNumber;
      billProduct.numberOfPackage=product.package;
      billProduct.product=product;
      billProduct.productId=product.id;
      billProduct.purchasePrice=product.purchasePrice;
      billProduct.status="edited";
      billProduct.tax=product.tax;
      billProduct.unitsInPackage =product.unitsInPackage;
      billProduct.vendorBillId=this.currentBill.id;
      
      this.currentBill.vendorBillProducts.push(billProduct);
      //scroll bottom 
      this.billProductsContainer.nativeElement.scrollTop = this.billProductsContainer.nativeElement.scrollHeight;

    } 
    else//product exist in waybill, update the package
    {
      editedBillProduct.purchasePrice=product.purchasePrice;
      editedBillProduct.numberOfPackage = product.package;
    }
    this.calculateCurrentBillPrices();
  }
  changeStatus(billProduct:VendorBillProduct)
  {
    billProduct.status='edited';
    this.calculateCurrentBillPrices();
  }
  calculateCurrentBillPrices() {
    this.currentBillTotals = new Totals();
    this.currentBill.vendorBillProducts.forEach(billProduct => {
      let numberOfPieces = billProduct.numberOfPackage * billProduct.unitsInPackage;
      this.currentBillTotals.totalPackages += billProduct.numberOfPackage;
      this.currentBillTotals.totalPieces += numberOfPieces;
      this.currentBillTotals.totalNetPrice += numberOfPieces * billProduct.purchasePrice;
      this.currentBillTotals.totalTaxPrice += numberOfPieces * (billProduct.purchasePrice * billProduct.tax / 100);
    
      this.currentBillTotals.totalGrossPrice = this.currentBillTotals.totalNetPrice + this.currentBillTotals.totalTaxPrice;
    });
    this.currentBillTotals.totalItems = this.currentBill.vendorBillProducts.length;
  }
  getProducts() {
   
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsUrl,null).subscribe(items => {
     
     this.products=items.data;
      //this.fillBasketProducts();
      this.loading = false;
    },error=>{
      this.toastr.error("Ürünler Getirilirken hata meydana geldi");
    });
  }

  fillCategories() {
    this.commonService.getCategories(this.config.getCategoriesUrl, null).subscribe(categories => {
      this.categories = categories;


    },error=>{
      this.toastr.error("Kategoriler Getirilirken hata meydana geldi");
    });
  }
  fillSuppliers() {
    this.commonService.getSuppliers(this.config.getSuppliersUrl, null).subscribe(result => {
      this.suppliers = result;
      if(this.suppliers.length>0)
      {
        this.selectedSupplier=this.suppliers[0];
      }
    },error=>{
      this.toastr.error("Toptancılar Getirilirken hata meydana geldi");
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
