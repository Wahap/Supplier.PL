import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NgForm }    from '@angular/forms';
import { CustomersService } from './customers.service';
import { ConfigService, IConfig } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { customer } from '../../shared/DTOs/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  loading: boolean;
  config: IConfig;
  customers:customer[];
  selectedCustomer:customer;
  customer:customer;
  newCustomer:boolean;
  displayDialog: boolean;
  activeButtonText:string;
  constructor(private commonServices: CommonService, private customersService: CustomersService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.activeButtonText="Pasif Et";

  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
  }
  showDialogToAdd() {
    this.newCustomer = true;
    this.customer = new customer();
    this.displayDialog = true;
  }

  delete() {
    this.customer.isActive=!this.customer.isActive;
    this.save();
  }
  save() {
    let customers = [...this.customers];
 
    this.customersService.saveCustomer(this.config.saveCustomerUrl, this.customer)
      .subscribe(result => {
        if (result == true) {
          if (this.newCustomer) {
            this.getCustomers();
          }
          else {
            customers[this.findSelectedIndex()] = this.customer;
            this.customers = customers;
            this.customer = null;
          }
          this.toastr.success('Musteri Basariyla Kaydedildi.', 'Basarili !');
        }else
        this.toastr.error(result, 'Hata!');
      },
      error => this.toastr.error('Urun kaydedilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
       
        this.displayDialog = false;
      });
  }



  getCustomers(): any {
    this.loading = true;
    this.customersService.getCustomers(this.config.getCustomersUrl, this.customers)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.customers = items;
          this.loading = false;
        }5
      },
      error => this.toastr.error('Musteriler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

    onRowSelect(event) {
    this.newCustomer = false;
    this.customer = Object.assign({}, event.data);
    this.displayDialog = true;

    //set selected dropdowns values
    this.activeButtonText=this.customer.isActive!=false?'Pasif Et':'Aktif Et';

  }
  findSelectedIndex(): number {
    return this.customers.indexOf(this.selectedCustomer);
  }
  customize(rowData, rowIndex): string {
    return  rowData.isActive?"": "inactive-row";
}

}
