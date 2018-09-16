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
  selectedDate: Date;
  isNewRecord:boolean;
  lastBill:Bill;
  @Input()
  selectedBill:Bill;  
  constructor(private customerService: CustomersService, public toastr: ToastsManager, vcr: ViewContainerRef, private billService: BillService, private productsService: ProductsService, private configService: ConfigService, public dialog: MatDialog,public router: Router) 
  {
    this.toastr.setRootViewContainerRef(vcr);
    this.loading = false;
    this.isNewRecord=true;
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getProducts();
    this.fillCustomers();
    this.deletedBasketProducts = [];
  //  this.setLastBill();
  }

  ngOnChanges() {
    if (this.selectedBill != null) {
      this.getBillById(this.selectedBill.id);
      this.fillBasketProducts();
      this.isNewRecord=false;
    }
  }
  getBillById(selectedBillId): any {

    this.loading = true;
    this.billService.getBill(this.config.getBillUrl, selectedBillId)
      .subscribe(items => {
     this.setCurrentbill(items);
      },
        error => this.toastr.error('Irsaliye getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {
          this.loading = false;
          this.fillBasketProducts();
        }
      );
  }
  setLastBill() {
    this.loading = true;
    this.billService.getLastBill(this.config.getLastBillUrl, null)
      .subscribe(items => {
        this.lastBill=items;
        this.setCurrentbill(items);
      },
        error => this.toastr.error('Irsaliye getirilirken hata ile karsilasildi.' + error, 'Error!'),
        () => {
          this.loading = false;
          this.fillBasketProducts();
        }
      );
  }

  setCurrentbill(items){
    this.currentBill = [];
    this.deletedBasketProducts = [];
    var bill = items;
    this.selectedCustomer = this.customers.filter(x => x.id == bill.customer.id)[0];
    this.selectedCustomer.addresses = bill.customer.addresses;
    this.selectedAddress = bill.customer.addresses.filter(x => x.id == bill.addressId)[0];
    this.selectedDate = new Date(bill.billDate);
    bill.billProducts.forEach(bp => {
      var product = this.productList.filter(x => x.id == bp.productId)[0];
      let basketProduct = new BasketProduct();
      basketProduct.id = bp.id;
      basketProduct.billNumber = bill.id;
      basketProduct.product = product;
      basketProduct.package = bp.numberOfPackage;
      this.addProductToCurrentBill(basketProduct);
    });
  }
  fillBasketProducts() {
    this.basketProducts = [];
    this.productList.forEach(element => {
      let basketProduct = new BasketProduct();
      basketProduct.package = 0;
      let productInCurrentBill = this.getProductFromCurrentBill(element.id);
      if (productInCurrentBill) {
        basketProduct.package = productInCurrentBill.package;
      }
      basketProduct.product = element;
      this.basketProducts = [...this.basketProducts, basketProduct];
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
    //  bill.billNumber=this.lastBill.billNumber+1;
    }
    else if( this.lastBill!=null){
      bill.id = this.lastBill.id;
      bill.billNumber=this.lastBill.billNumber+1;
    }

    
    
    bill.addressId = this.selectedAddress.id;
    bill.customerId = this.selectedCustomer.id;
    bill.createdDate = this.selectedDate;
    bill.billStatus = 1;
    bill.isActive = true;
    this.currentBill.forEach(basketProduct => {
      let billProduct = new BillProduct();
      billProduct.id = basketProduct.id;
      billProduct.billId = basketProduct.waybillId;
      billProduct.netSalePrice=basketProduct.product.netSalePrice;
      billProduct.tax=basketProduct.product.tax;
      billProduct.numberOfPackage = basketProduct.package;
      billProduct.productId = basketProduct.product.id;
      billProduct.status = basketProduct.status
      bill.billProducts.push(billProduct);
    });

    //add also removed/deleted product with "deleted" flag/status
    this.deletedBasketProducts.forEach(dltd => {
      let deletedBillProduct = new BillProduct();
      deletedBillProduct.id = dltd.id;
      deletedBillProduct.status = dltd.status;
      bill.billProducts.push(deletedBillProduct);

    });

    this.billService.saveBill(this.config.saveBillUrl, bill).subscribe(result => {
      this.toastr.info("Fatura başarıyla kaydedildi...");
      this.router.navigateByUrl("/billList");
     
    });
  }
  getProducts() {
    this.loading = true;
    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl, null).subscribe(items => {
      this.productList = items;
      this.fillBasketProducts();
      this.loading = false;
    });
  }

  increase(basketProduct: BasketProduct) {
    basketProduct.package++;
    basketProduct.status = "edited";
    this.addProductToCurrentBill(basketProduct);
  }

  decrease(basketProduct: BasketProduct) {

    if (basketProduct.package <= 1) {//remove product from basket
      let updateProduct = this.basketProducts.filter(x => x.product == basketProduct.product)[0];
      updateProduct.package = 0;
      basketProduct.package = 0;
      this.removeProductToCurrentBill(basketProduct);
    }
    else {
      basketProduct.package -= 1;
      basketProduct.status = "edited";
      this.addProductToCurrentBill(basketProduct);
    }
    // this.getProductsInBasket();
  }

  addProductToCurrentBill(basketProduct: BasketProduct) {
    let isExist = false;
    let updateProduct = this.basketProducts.filter(x => x.product == basketProduct.product)[0];
    updateProduct.package = basketProduct.package;

    for (let i = 0; i < this.currentBill.length; i++)//check if product exist in currentWaybill
    {
      if (this.currentBill[i].product.id == basketProduct.product.id) {
        this.currentBill[i].package = basketProduct.package;
        this.currentBill[i].status = basketProduct.status;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      // basketProduct.status="added";
      this.currentBill = [...this.currentBill, basketProduct];
    }
    //   localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
  }

  removeProductToCurrentBill(basketProduct: BasketProduct) {
    for (let i = 0; i < this.currentBill.length; i++)//check if product exist in basket
    {
      if (this.currentBill[i].product.id == basketProduct.product.id) {
        var index = this.currentBill.indexOf(this.currentBill[i]);
        if (index > -1) {
          //if any existing product deleted 
          if (this.currentBill[i].id != null && this.deletedBasketProducts.indexOf(this.currentBill[i]) < 0) {
            this.currentBill[i].status = "deleted";
            this.deletedBasketProducts.push(this.currentBill[i])
          }
          this.currentBill.splice(index, 1);
          this.currentBill = [...this.currentBill];
        }
      }
    }
    // localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
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
