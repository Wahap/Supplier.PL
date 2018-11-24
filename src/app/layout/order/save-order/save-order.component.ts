import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter
} from "@angular/core";
import { CustomersService } from "../../customers/customers.service";
import { CommonService } from "../../../shared/common.service";
import { ToastsManager } from "ng2-toastr";
import { OrderService } from "../order.service";
import { ProductsService } from "../../products/products.service";
import { ConfigService, IConfig } from "../../../app.config";
import { Router } from "@angular/router";
import { StockService } from "../../stock/stock.service";
import { Product } from "../../../shared/DTOs/product";
import { WareHouse } from "../../../shared/DTOs/wareHouse";
import { Customer } from "../../../shared/DTOs/customer";
import { DiscountRate } from "../../../shared/DTOs/discountRate";
import { Address } from "../../../shared/DTOs/address";
import { ReceivedOrder } from "../../../shared/DTOs/receivedOrder";
import { Totals } from "../../../shared/DTOs/totals";
import { Category } from "../../../shared/DTOs/category";
import { ProductListOptions } from "../../../shared/DTOs/productListOptions";
import { ReceivedOrderProduct } from "../../../shared/DTOs/receivedOrderProduct";

@Component({
    selector: "app-save-order",
    templateUrl: "./save-order.component.html",
    styleUrls: ["./save-order.component.scss"]
})
export class SaveOrderComponent implements OnInit {
    loading: boolean;
    config: IConfig;
    products: Product[] = [];
    wareHouses: WareHouse[] = [];
    primaryWareHouseId: number;
    currentOrder: ReceivedOrder = new ReceivedOrder();
    productListCols: any[];
    priceTypeId: number = 1;
    createdDate: Date=new Date();//Default value
    deliveryDate: Date=new Date();
    customers: Customer[] = [];
    discountRates: DiscountRate[] = [];
    deletedOrderProducts: ReceivedOrderProduct[] = [];
    currentOrderTotals: Totals = new Totals();
    categories: Category[] = [];
    isOrderSaving: boolean = false;
    selectedCustomer: Customer = new Customer();
    selectedDiscountRate: DiscountRate = new DiscountRate();
    selectedAddress: Address = new Address();
    deliveryAddress: Address = new Address();
    rowNumber = 0;
    filteredCategoryId: number = 0;
    isDirty:boolean=false;//check is there a unsaved changes
    @ViewChild("wayBillProductsContainer")
    private wayBillProductsContainer: ElementRef;
    @Input()
    selectedOrder: ReceivedOrder;
    @Output() onOrderSaved = new EventEmitter();
    constructor(
        private customerService: CustomersService,
        private commonService: CommonService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private orderService: OrderService,
        private productsService: ProductsService,
        private configService: ConfigService,
        public router: Router,
        private stockService: StockService
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.loading = false;

        //this.isNewRecord = true;
    }
    ngOnInit() {
        this.config = this.configService.getAppConfig();

        this.productListCols = [
            // { field: 'barcodeOfProduct', header: 'Barkod' },
            // { field: 'orderNumber', header: 'S.No' },
            { field: "productName", header: "Ürün" },
            { field: "netSalePrice", header: "Fiyat" },
            { field: "package", header: "Koli" }
        ];

        //this.getProducts();
        //  this.fillBasketProducts();
        this.fillCustomers();
        this.fillCategories();
        this.fillDiscountRates(); //Skonto
        this.getWareHouses();
    } 
    ngOnChanges() {
        if(this.selectedOrder != null && this.customers.length>0)
        {
          this.currentOrder.id=this.selectedOrder.id;
          this.currentOrder.convertedWaybillId=this.selectedOrder.convertedWaybillId;
          this.currentOrder.extraDiscount=this.selectedOrder.extraDiscount;
          this.priceTypeId=this.selectedOrder.priceTypeId==null?1:this.selectedOrder.priceTypeId;
          this.selectedCustomer=this.customers.find(x=>x.id==this.selectedOrder.customerId);
          this.selectedAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedOrder.addressId);
          this.deliveryAddress=this.selectedCustomer.addresses.find(x=>x.id==this.selectedOrder.deliveryAddressId);
          let cd=new Date(this.selectedOrder.createdDate);
          this.createdDate=new Date(cd.getFullYear(),cd.getMonth(),cd.getDate(),8,0,0);
          let dd=new Date(this.selectedOrder.deliveryDate);
          this.deliveryDate=new Date(dd.getFullYear(),dd.getMonth(),dd.getDate(),8,0,0);
          this.selectedCustomer.extraDiscount=this.selectedOrder.extraDiscount;//discount sync
          this.selectedDiscountRate=this.discountRates.find(x=>x.id==this.selectedOrder.discountRateId);
          
          this.deletedOrderProducts=[];
          this.mapSelectedOrderProductsToCurrentOrderProducts();
          this.getProducts();
        }
        
        // if (this.selectedOrder != null) {
        //   this.getWayBillById(this.selectedOrder.id);
        //   this.isNewRecord = false;
        // }
      }
     
      mapSelectedOrderProductsToCurrentOrderProducts()
      {
        this.orderService.getReceivedOrderProducts(this.config.getReceivedOrderProductsUrl,this.selectedOrder).subscribe(orderProducts=>{
          this.currentOrder.receivedOrderProducts=orderProducts;
          this.rowNumber=orderProducts[orderProducts.length-1].rowNumber;
          this.calculateCurrentOrderPrices();
        });
      }

    saveOrder() {
        this.isOrderSaving=true;
       
        if (this.selectedOrder != null) {
          this.currentOrder.id = this.selectedOrder.id;
          
        }
       
       
        this.currentOrder.addressId = this.selectedAddress.id;
        this.currentOrder.customerId = this.selectedCustomer.id;
        this.currentOrder.extraDiscount=this.currentOrder.extraDiscount;
        this.currentOrder.priceTypeId=this.priceTypeId;//Which Price Type Used
        this.currentOrder.createdDate =new Date(this.createdDate.getFullYear(),this.createdDate.getMonth(),this.createdDate.getDate(),8,0,0);
        this.currentOrder.deliveryDate =new Date(this.deliveryDate.getFullYear(),this.deliveryDate.getMonth(),this.deliveryDate.getDate(),8,0,0);
        this.currentOrder.deliveryAddressId = this.deliveryAddress.id;
        this.currentOrder.orderStatus = 1;
        this.currentOrder.discountRateId=this.selectedDiscountRate.id;
        this.currentOrder.discountRate=null;//No need to create a new Discount rate
       
    
       //add also removed/deleted product with "deleted" flag/status
        this.deletedOrderProducts.forEach(dltd => {
          this.currentOrder.receivedOrderProducts.push(dltd);
        });
    
        this.orderService.saveOrder(this.config.saveReceivedOrderUrl, this.currentOrder).subscribe((result:ReceivedOrder )=> {
          this.toastr.success("sipariş başarıyla kaydedildi...");
          this.isOrderSaving=false;
          this.isDirty=false;
          if(this.selectedOrder==null)//new waybill operation completed
          {
            this.router.navigateByUrl('thisMonthReceivedOrders');
          }
          else{//update waybill operation completed
            this.onOrderSaved.emit(result);
          }
       
    
        },error=>{
          this.toastr.error("irsaliye Kaydedilirken bir hata oluştu...");
        });
      }
    increase(product: Product) {
   
        product.package++;
        this.saveProductToOrder(product);
      
    
    }
    setPackage(product: Product) {
    
      if (product.package > 0) {
        this.saveProductToOrder(product);
      }
    
    
    }
      decrease(product: Product) {
    
        if (product.package > 0)//prevent negative inputs
        {
          product.package--;
          this.saveProductToOrder(product);
        }
    
    
        // this.getProductsInBasket();
      }
      changeStatus(orderProduct:ReceivedOrderProduct)
      {
        orderProduct.status='edited';
        this.calculateCurrentOrderPrices();
      }
      increaseWaybillProduct(orderProduct:ReceivedOrderProduct)
      {
        orderProduct.numberOfPackage++;
        orderProduct.status="edited";
        this.products.find(x=>x.id==orderProduct.productId).package=orderProduct.numberOfPackage;//sync packages
        this.calculateCurrentOrderPrices();
      }
      decreaseWaybillProduct(orderProduct:ReceivedOrderProduct)
      {
        if(orderProduct.numberOfPackage<=1)//delete from currentOrder
        {
          let indis=this.currentOrder.receivedOrderProducts.findIndex(x=>x.productId==orderProduct.productId);
          this.currentOrder.receivedOrderProducts.splice(indis,1);
          if(orderProduct.id>0)
          {
            orderProduct.status="deleted";
            this.deletedOrderProducts.push(orderProduct);
          }
          this.products.find(x=>x.id==orderProduct.productId).package=0;//sync packages
        }
        else
        {
            orderProduct.numberOfPackage--;
            orderProduct.status="edited";
          this.products.find(x=>x.id==orderProduct.productId).package=orderProduct.numberOfPackage;//sync packages
        }
        this.calculateCurrentOrderPrices();
       
      }
      removeWaybillProduct(orderProduct:ReceivedOrderProduct)
      {
        let indis=this.currentOrder.receivedOrderProducts.findIndex(x=>x.productId==orderProduct.productId);
        this.currentOrder.receivedOrderProducts.splice(indis,1);
        this.products.find(x=>x.id==orderProduct.productId).package=0;//sync packages
        if(orderProduct.id>0)
          {
            orderProduct.status="deleted";
            this.deletedOrderProducts.push(orderProduct);
          }
        this.calculateCurrentOrderPrices();
      }
      saveProductToOrder(product: Product) {
        this.isDirty=true;
        let editedOrderProduct = this.currentOrder.receivedOrderProducts.find(x => x.productId == product.id);
        if (editedOrderProduct != undefined && product.package < 1)//Delete product from currentOrder
        {
          
          let index = this.currentOrder.receivedOrderProducts.findIndex(item => item.productId == product.id);
          this.currentOrder.receivedOrderProducts.splice(index, 1);
          if(editedOrderProduct.id>0)//Delete operation
          {
          
            editedOrderProduct.status="deleted";
            this.deletedOrderProducts.push(editedOrderProduct);
          
          }
          
        }
        else if (editedOrderProduct == undefined)//product will be added first time
        {
          this.rowNumber++;
          let orderProduct=new ReceivedOrderProduct();
          orderProduct.id=0;
          orderProduct.wareHouseId=this.primaryWareHouseId;
          orderProduct.rowNumber=this.rowNumber;
          orderProduct.netSalePrice=product.netSalePrice;
          orderProduct.numberOfPackage=product.package;
          orderProduct.product=product;
          orderProduct.productId=product.id;
          orderProduct.purchasePrice=product.purchasePrice;
          orderProduct.status="edited";
          orderProduct.tax=product.tax;
          orderProduct.unitsInPackage=product.unitsInPackage;
          orderProduct.receivedOrderId=this.currentOrder.id;
          this.currentOrder.receivedOrderProducts.push(orderProduct);
            //scroll bottom 
            this.wayBillProductsContainer.nativeElement.scrollTop = this.wayBillProductsContainer.nativeElement.scrollHeight;
        }
        else//product exist in waybill, update the package
        {
          editedOrderProduct.numberOfPackage = product.package;
          editedOrderProduct.netSalePrice=product.netSalePrice;
          editedOrderProduct.status="edited";
        }
        this.calculateCurrentOrderPrices();
      }
      calculateCurrentOrderPrices()
      {
        this.currentOrderTotals=new Totals();
        this.currentOrder.receivedOrderProducts.forEach(orderProduct=>{  
          let pieces = orderProduct.unitsInPackage * orderProduct.numberOfPackage;
          let subNetPrice = pieces * orderProduct.netSalePrice;
          this.currentOrderTotals.totalPackages += orderProduct.numberOfPackage; 
          this.currentOrderTotals.totalPieces += pieces;
          this.currentOrderTotals.subNetTotalPrice += subNetPrice;//net ara toplam
                                               //Calculate total tax after discount
          this.currentOrderTotals.totalTaxPrice += (subNetPrice - (subNetPrice * this.currentOrder.extraDiscount / 100)) * orderProduct.tax / 100;
        });
        this.currentOrderTotals.extraDiscount = this.currentOrderTotals.subNetTotalPrice * this.currentOrder.extraDiscount / 100;//total discount
        this.currentOrderTotals.totalNetPrice = this.currentOrderTotals.subNetTotalPrice - this.currentOrderTotals.extraDiscount;//total net price
        this.currentOrderTotals.totalGrossPrice = this.currentOrderTotals.totalNetPrice + this.currentOrderTotals.totalTaxPrice;
      }
    onCustomerSelect() {
        this.selectedAddress = this.selectedCustomer.addresses[0];
        this.deliveryAddress = this.selectedCustomer.addresses[0];
        if (this.selectedCustomer.discountRateId != null) {
            this.selectedDiscountRate = this.discountRates.find(
                x => x.id == this.selectedCustomer.discountRateId
            );
        }
        if (this.selectedCustomer.priceTypeId != null) {
            this.priceTypeId = this.selectedCustomer.priceTypeId;
        }
        this.currentOrder.extraDiscount = this.selectedCustomer.extraDiscount;
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
        this.productsService
            .getProducts(
                this.config.getProductsByPriceTypeUrl,
                productListOptions
            )
            .subscribe(
                items => {
                    this.products = items;
                    //this.fillBasketProducts();
                    this.loading = false;
                },
                error => {
                    this.toastr.error(
                        "Ürünler Getirilirken Bir Hata Oluştu..."
                    );
                }
            );
    }
    fillCustomers() {
        this.customerService
            .getCustomers(this.config.getCustomersUrl, null)
            .subscribe(
                result => {
                    this.customers = result;
                },
                error => {
                    this.toastr.error(
                        "Müşteriler Getirilirken Bir Hata Oluştu..."
                    );
                }
            );
    }

    getWareHouses() {
        this.stockService
            .getWareHouses(this.config.getWareHousesUrl, null)
            .subscribe(
                result => {
                    this.wareHouses = result;
                    let primary = this.wareHouses.find(
                        x => x.isPrimary == true
                    );
                    this.primaryWareHouseId =
                        primary == undefined ? result[0].id : primary.id;
                },
                error => {
                    this.toastr.error(
                        "Depolar Getirilirken Bir Hata Oluştu..."
                    );
                }
            );
    }

    fillDiscountRates() {
        this.commonService
            .getAllDiscountRates(this.config.getAllDiscountRatesUrl, null)
            .subscribe(
                result => {
                    this.discountRates = result;
                    if (result.length > 0 && this.selectedOrder == null) {
                        this.selectedDiscountRate = result[0];
                    }
                },
                error => {
                    this.toastr.error(
                        "iskonto Oranları Getirilirken Bir Hata Oluştu..."
                    );
                }
            );
    }

    fillCategories() {
        this.commonService
            .getCategories(this.config.getCategoriesUrl, null)
            .subscribe(
                categories => {
                    this.categories = categories;
                },
                error => {
                    this.toastr.error(
                        "Kategoriler Getirilirken Bir Hata Oluştu..."
                    );
                }
            );
    }
    filterProductsByCategory(filteredCategoryId, product: Product) {
        if (filteredCategoryId == undefined || filteredCategoryId == 0) {
            return true;
        } else if (product.category == null) {
            return false;
        } else {
            return product.categoryId == filteredCategoryId;
        }
    }
    windowsHeight() {
        return window.screen.height - 325 + "px";
    }
}
