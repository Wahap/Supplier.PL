import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IConfig, ConfigService } from '../../../app.config';
import { CustomersService } from '../../customers/customers.service';
import { ToastsManager } from 'ng2-toastr';
import { ReturnBillService } from '../return-bill.service';
import { ProductsService } from '../../products/products.service';
import { Router } from '@angular/router';
import { Customer } from '../../../shared/DTOs/customer';
import { Category } from '../../../shared/DTOs/category';
import { CommonService } from '../../../shared/common.service';

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

  fillCustomers() {
    this.customerService.getCustomers(this.config.getCustomersUrl, null).subscribe(result => {
      this.customers = result; 
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
  
  windowsHeight() {
    return (window.screen.height - 325) + "px";
  }

}
