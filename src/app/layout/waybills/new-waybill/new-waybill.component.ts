import { Component, OnInit, ViewContainerRef } from '@angular/core';
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

@Component({
  selector: 'app-new-waybill',
  templateUrl: './new-waybill.component.html',
  styleUrls: ['./new-waybill.component.scss']
})
export class NewWaybillComponent implements OnInit {
  config: IConfig;
  basketProducts:BasketProduct[]=[];
  currentWaybill:BasketProduct[]=[];
  customers:customer[]=[];
  selectedCustomer:customer=new customer();
  selectedAddress:address=new address();
  lastWayBill:Waybill;
  selectedDate:Date;
  constructor(private customerService:CustomersService,public toastr: ToastsManager, vcr: ViewContainerRef, private waybillService:WaybillService, private productsService:ProductsService,private configService: ConfigService) 
  {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.fillBasketProducts();
    this.fillCurrentWaybill();
    this.fillCustomers();
    this.waybillService.getLastWaybill(this.config.getLastWaybillUrl,null).subscribe(result=>{
      this.lastWayBill=result;
    });
  }
 
  fillCustomers()
  {
    this.customerService.getCustomers(this.config.getCustomersUrl,null).subscribe(result=>
      {

        this.customers=result;
        console.log(result);
      });
  }
  increase(basketProduct:BasketProduct)
  {
    basketProduct.package++;
   this.addProductToCurrentWaybill(basketProduct);
  }


    decrease(basketProduct: BasketProduct) {
    
      if (basketProduct.package <= 1) {//remove product from basket
        basketProduct.package = 0;
        this.removeProductToCurrentWaybill(basketProduct);
      }
      else {
        basketProduct.package -= 1;
        this.addProductToCurrentWaybill(basketProduct);
      }
     // this.getProductsInBasket();
  
    }
  

  saveCurrentWaybillProducts(waybillProducts:WaybillProduct[])
  {
    localStorage.setItem("currentWaybill",JSON.stringify(waybillProducts));
  }

  fillCurrentWaybill() 
  {
    this.currentWaybill=JSON.parse(localStorage.getItem("currentWaybill")) || [];
  
  }


  removeCurrentWaybill()
  {
    localStorage.removeItem("currentWaybill");
    this.currentWaybill=[];  
  }

  addProductToCurrentWaybill(basketProduct:BasketProduct)
  {
    let isExist = false;
 
    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in currentWaybill
    {
      
      if (this.currentWaybill[i].product.id == basketProduct.product.id) {
        this.currentWaybill[i].package = basketProduct.package;
        isExist = true;
       
      }
      
    }
    
    if (!isExist) {
     
       this.currentWaybill=[...this.currentWaybill,basketProduct];
      
      }

    localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
  }

  removeProductToCurrentWaybill(basketProduct: BasketProduct) {
    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in basket
    {
      
      if (this.currentWaybill[i].product.id == basketProduct.product.id) {
        var index = this.currentWaybill.indexOf(this.currentWaybill[i]);
        if (index > -1) {
          this.currentWaybill.splice(index, 1);
          this.currentWaybill=[...this.currentWaybill];
      }
      }
      
    }

    localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
  }

  getProductFromCurrentWaybill(id:number)
  {
    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in waybill
    {
      
      if (this.currentWaybill[i].product.id ==id) {
         return this.currentWaybill[i]; 
      }
      
    }

    return null;
  }

  fillBasketProducts()
  {
    this.basketProducts=[];
    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl,null).subscribe(items=>{
     items.forEach(element => {
       let basketProduct=new BasketProduct();
      
      basketProduct.package=0;
      let productInCurrentWaybill=this.getProductFromCurrentWaybill(element.id);
      if(productInCurrentWaybill)
      {
        basketProduct.package=productInCurrentWaybill.package;
      }
      basketProduct.product=element;
      this.basketProducts = [...this.basketProducts, basketProduct];
     
     });
   
    });
  }

  saveWaybill()
  {
    let waybill:Waybill=new Waybill();
    waybill.addressId=this.selectedAddress.id;
    waybill.customerId=this.selectedCustomer.id;
    waybill.waybillDate=this.selectedDate;
    waybill.waybillStatus=1;
    this.currentWaybill.forEach(basketProduct => {
      let waybillProduct=new WaybillProduct();
      waybillProduct.numberOfPackage=basketProduct.package;
      waybillProduct.productId=basketProduct.product.id;
      waybill.waybillProducts.push(waybillProduct);
    });

    this.waybillService.createNewWaybill(this.config.createWaybillUrl,waybill).subscribe(result=>{
      this.toastr.info("irsaliye başarıyla oluşturuldu...");
    });
    

  }

}
