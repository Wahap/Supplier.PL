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
  lastWaybill:Waybill=new Waybill();
  selectedDate:Date;
  productList:product[]=[];
  @Input()
  selectedWayBill: Waybill;

  constructor(private customerService:CustomersService,public toastr: ToastsManager, vcr: ViewContainerRef, private waybillService:WaybillService, private productsService:ProductsService,private configService: ConfigService,public dialog: MatDialog) 
  {
    this.toastr.setRootViewContainerRef(vcr);
    
   }

   ngOnChanges()
   {
    if(this.selectedWayBill!=null){
 
     this.getWayBillById(this.selectedWayBill.id);
     this.fillBasketProducts();
      }
   }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getProducts();
  //  this.fillBasketProducts();
    this.fillCurrentWaybill();
    this.fillCustomers();
   // this.setLastWaybill();

  }

  getWayBillById(selectedWayBillId): any {
  //  this.loading = true;

    this.waybillService.getWaybill(this.config.getWaybillUrl, selectedWayBillId)
      .subscribe(items => {
    //    if (items != null && items.length != 0) {
      var wayBill=items;
      wayBill.waybillProducts.forEach(wp => {
        var product=this.productList.filter(x=>x.id==wp.productId)[0];
        let basketProduct=new BasketProduct();
        basketProduct.product=product;
        basketProduct.package=wp.numberOfPackage;
    
        this.addProductToCurrentWaybill(basketProduct);

      });
      //    this.loading = false;
    //    }
      },
      error => this.toastr.error('Siparisler getirilirken hata ile karsilasildi.'+error, 'Error!'),
      () => {
        //finally bloke ..!
        this.fillBasketProducts();
      }
      );
  }

  setLastWaybill()
  {
    this.waybillService.getLastWaybill(this.config.getLastWaybillUrl,null).subscribe(result=>{
      console.log(result);
      this.lastWaybill=result;
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
        let updateProduct= this.basketProducts.filter(x=>x.product==basketProduct.product)[0];
        updateProduct.package=0;
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
   // localStorage.setItem("currentWaybill",JSON.stringify(waybillProducts));
  }

  fillCurrentWaybill() 
  {
    //this.currentWaybill=JSON.parse(localStorage.getItem("currentWaybill")) || [];
  
  }

 clearProducts()
 {
  let dialogRef = this.dialog.open(ConfirmComponent, {
    width: '50%',
    data: { title:"irsaliyeyi sıfırlamak istiyor musunuz?" }
  });

  dialogRef.afterClosed().subscribe(result => {
   if(result=='yes')
   {
    this.removeCurrentWaybill();
   }
  });
 }
  removeCurrentWaybill()
  {
   // localStorage.removeItem("currentWaybill");
    this.currentWaybill=[];  
  }

  addProductToCurrentWaybill(basketProduct:BasketProduct)
  {
    let isExist = false;
 
   let updateProduct= this.basketProducts.filter(x=>x.product==basketProduct.product)[0];
   updateProduct.package=basketProduct.package;

    for (let i = 0; i < this.currentWaybill.length; i++)//check if product exist in currentWaybill
    {
      
      if (this.currentWaybill[i].product.id == basketProduct.product.id) {
        this.currentWaybill[i].package = basketProduct.package;
        isExist = true;
        break;
       
      }
      
    }
    
    if (!isExist) {
     
       this.currentWaybill=[...this.currentWaybill,basketProduct];
      
      }

 //   localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
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

   // localStorage.setItem("currentWaybill", JSON.stringify(this.currentWaybill));
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
  getProducts()
  {
    this.productsService.getProducts(this.config.getProductsWithRelationalEntitiesUrl,null).subscribe(items=>{
      this.productList=items;
      this.fillBasketProducts();
    });
  }
  fillBasketProducts()
  {
    this.basketProducts=[];
    
     this.productList.forEach(element => {
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
      waybillProduct.status=basketProduct.status
      waybill.waybillProducts.push(waybillProduct);
    });

    this.waybillService.createNewWaybill(this.config.createWaybillUrl,waybill).subscribe(result=>{
      this.toastr.info("irsaliye başarıyla oluşturuldu...");
      this.removeCurrentWaybill();
      this.setLastWaybill();
    });
    

  }

  windowsHeight(){
    return (window.screen.height -280) + "px";
  }

}
