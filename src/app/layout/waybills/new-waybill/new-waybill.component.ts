import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { BasketProduct } from '../../../shared/DTOs/basketProduct';
import { ProductsService } from '../../products/products.service';
import { IConfig, ConfigService } from '../../../app.config';
import { WaybillProduct } from '../../../shared/DTOs/waybillProduct';
import { retry } from 'rxjs/operator/retry';
import { Waybill } from '../../../shared/DTOs/wayBill';
import { customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../../customers/customers.service';
import { address } from '../../../shared/DTOs/address';
import { WaybillService } from '../waybill.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../../../shared/components/confirm/confirm.component';
import { product } from '../../../shared/DTOs/product';
import {Router} from '@angular/router';
@Component({
  selector: 'app-new-waybill',
  templateUrl: './new-waybill.component.html',
  styleUrls: ['./new-waybill.component.scss']
})
export class NewWaybillComponent implements OnInit {
  config: IConfig;
  basketProducts: BasketProduct[] = [];
  currentWaybill: BasketProduct[] = [];
  customers: customer[] = [];
  selectedCustomer: customer = new customer();
  selectedAddress: address = new address();
  deletedBasketProducts: BasketProduct[] = [];
  selectedDate: Date;
  productList: product[] = [];
  loading: boolean;
  lastWaybill:Waybill;
  @Input()
  selectedWayBill: Waybill;

  constructor(private customerService: CustomersService, public toastr: ToastsManager, vcr: ViewContainerRef, private waybillService: WaybillService, private productsService: ProductsService, private configService: ConfigService, public dialog: MatDialog,public router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.loading = false;
  }

  ngOnChanges() {
    if (this.selectedWayBill != null) {
      this.getWayBillById(this.selectedWayBill.id);
      this.fillBasketProducts();
    }
  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.currentWaybill = [];
    this.deletedBasketProducts = [];
    this.getProducts();
    //  this.fillBasketProducts();
    this.fillCurrentWaybill();
    this.fillCustomers();
     this.setLastWaybill();
  }

  getWayBillById(selectedWayBillId): any {

    this.loading = true;
    this.waybillService.getWaybill(this.config.getWaybillUrl, selectedWayBillId)
      .subscribe(items => {
        this.currentWaybill = [];
        this.deletedBasketProducts = [];
        var wayBill = items;
        this.selectedCustomer = this.customers.filter(x => x.id == wayBill.customer.id)[0];
        this.selectedCustomer.addresses = wayBill.customer.addresses;
        this.selectedAddress = wayBill.customer.addresses.filter(x => x.id == wayBill.addressId)[0];
        this.selectedDate = new Date(wayBill.waybillDate);
        wayBill.waybillProducts.forEach(wp => {
          var product = this.productList.filter(x => x.id == wp.productId)[0];
          let basketProduct = new BasketProduct();
          basketProduct.id = wp.id;
          basketProduct.waybillId = selectedWayBillId;
          basketProduct.product = product;
          basketProduct.package = wp.numberOfPackage;
          this.addProductToCurrentWaybill(basketProduct);
        });
      },
        error => this.toastr.error('Irsaliye getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {
          this.loading = false;
          this.fillBasketProducts();
        }
      );
  }

  setLastWaybill() {
    this.waybillService.getLastWaybill(this.config.getLastWaybillUrl,null).subscribe(result=>{
      this.lastWaybill=result;
    });
  }

  fillCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result => {
      this.customers = result;
    });
  }
  increase(basketProduct: BasketProduct) {
    basketProduct.package++;
    basketProduct.status = "edited";
    this.addProductToCurrentWaybill(basketProduct);
  }

  decrease(basketProduct: BasketProduct) {

    if (basketProduct.package <= 1) {//remove product from basket
      let updateProduct = this.basketProducts.filter(x => x.product == basketProduct.product)[0];
      updateProduct.package = 0;
      basketProduct.package = 0;
      this.removeProductToCurrentWaybill(basketProduct);
    }
    else {
      basketProduct.package -= 1;
      basketProduct.status = "edited";
      this.addProductToCurrentWaybill(basketProduct);
    }
    // this.getProductsInBasket();
  }

  saveCurrentWaybillProducts(waybillProducts: WaybillProduct[]) {
    // localStorage.setItem("currentWaybill",JSON.stringify(waybillProducts));
  }

  fillCurrentWaybill() {
    //this.currentWaybill=JSON.parse(localStorage.getItem("currentWaybill")) || [];
  }


  removeCurrentWaybill() {
    // localStorage.removeItem("currentWaybill");
    this.currentWaybill = [];
  }

  addProductToCurrentWaybill(basketProduct: BasketProduct) {
    let isExist = false;
    let updateProduct = this.basketProducts.filter(x => x.product == basketProduct.product)[0];
    updateProduct.package = basketProduct.package;

    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in currentWaybill
    {
      if (this.currentWaybill[i].product.id == basketProduct.product.id) {
        this.currentWaybill[i].package = basketProduct.package;
        this.currentWaybill[i].status = basketProduct.status;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      // basketProduct.status="added";
      this.currentWaybill = [...this.currentWaybill, basketProduct];
    }
    //   localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
  }

  removeProductToCurrentWaybill(basketProduct: BasketProduct) {
    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in basket
    {
      if (this.currentWaybill[i].product.id == basketProduct.product.id) {
        var index = this.currentWaybill.indexOf(this.currentWaybill[i]);
        if (index > -1) {
          //if any existing product deleted 
          if (this.currentWaybill[i].id != null && this.deletedBasketProducts.indexOf(this.currentWaybill[i]) < 0) {
            this.currentWaybill[i].status = "deleted";
            this.deletedBasketProducts.push(this.currentWaybill[i])
          }
          this.currentWaybill.splice(index, 1);
          this.currentWaybill = [...this.currentWaybill];
        }
      }
    }
    // localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
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
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl, null).subscribe(items => {
      this.productList = items;
      this.fillBasketProducts();
      this.loading = false;
    });
  }
  fillBasketProducts() {
    this.basketProducts = [];

    this.productList.forEach(element => {
      let basketProduct = new BasketProduct();

      basketProduct.package = 0;
      let productInCurrentWaybill = this.getProductFromCurrentWaybill(element.id);
      if (productInCurrentWaybill) {
        basketProduct.package = productInCurrentWaybill.package;
      }
      basketProduct.product = element;
      this.basketProducts = [...this.basketProducts, basketProduct];
    });
  }

  saveWaybill() {
    let waybill: Waybill = new Waybill();
    if (this.selectedWayBill != null) {
      waybill.id = this.selectedWayBill.id;
    }
    waybill.addressId = this.selectedAddress.id;
    waybill.customerId = this.selectedCustomer.id;
    waybill.waybillDate = this.selectedDate;
    waybill.waybillStatus = 1;
    waybill.isActive = true;
    this.currentWaybill.forEach(basketProduct => {
      let waybillProduct = new WaybillProduct();
      waybillProduct.id = basketProduct.id;
      waybillProduct.waybillId = basketProduct.waybillId;
      waybillProduct.numberOfPackage = basketProduct.package;
      waybillProduct.productId = basketProduct.product.id;
      waybillProduct.status = basketProduct.status
      waybill.waybillProducts.push(waybillProduct);
    });

    //add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedWayBillProduct = new WaybillProduct();
      deletedWayBillProduct.id = dltd.id;
      deletedWayBillProduct.status = dltd.status;
      waybill.waybillProducts.push(deletedWayBillProduct);

    });

    this.waybillService.saveWaybill(this.config.saveWaybillUrl, waybill).subscribe(result => {
      this.toastr.info("irsaliye başarıyla kaydedildi...");
      this.selectedWayBill=null;
    //this.router.navigateByUrl('/waybills')
      //this.removeCurrentWaybill();
        //this.setLastWaybill();
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
