import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NgForm } from '@angular/forms';
import { CustomersService } from './customers.service';
import { ConfigService, IConfig } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { customer } from '../../shared/DTOs/customer';
import { address } from '../../shared/DTOs/address';
import { city } from '../../shared/DTOs/city';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  cities: city[];
  selectedCity:city;
  loading: boolean;
  config: IConfig;
  customers: customer[];
  selectedCustomer: customer;
  customer: customer;
  customerAddress: address;
  addresses:address[];

  newCustomer: boolean;
  displayCustomerDialog: boolean;
  displayCustomersAddressDialog:boolean;
  activeButtonText: string;
  activeIndex: number;
  items: any = [];
  constructor(private commonServices: CommonService, private customersService: CustomersService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.activeButtonText = "Pasif Et";
    this.activeIndex = 0;
    this.customerAddress= new address();

  }

  save() {
    let customers = [...this.customers];
    this.selectedCity!=null? this.customerAddress.cityId= this.selectedCity.id:"";
    if(this.newCustomer)
    {
      this.customer.isActive=true;
    }
    if(this.customer.addresses==null)
    {
      this.customer.addresses=[];
      this.customer.addresses.push(this.customerAddress);
    }else{
      this.customer.addresses[0]=this.customerAddress;
    }
  
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
        } else
          this.toastr.error(result, 'Hata!');
      },
      error => this.toastr.error('Urun kaydedilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page

        this.displayCustomerDialog = false;
      });
  }

  onRowSelect(event) {
    this.newCustomer = false;
    this.customer = Object.assign({}, event.data);
    this.selectedCity=new city();
    this.activeIndex=0;
    this.customerAddress = event.data.addresses[0];
    
    if(event.data.addresses[0]==null){
      this.customerAddress=new address();
    }
    this.customerAddress.cityId!=null?this.selectedCity=this.cities.filter(x => x.id == this.customerAddress.cityId)[0]:"";
    this.displayCustomerDialog = true;
   
    //set selected dropdowns values
    this.activeButtonText = this.customer.isActive != false ? 'Pasif Et' : 'Aktif Et';

  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
    this.getCities();

    this.items = [{
      label: 'Müşteri Bilgisi',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'Adres',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    }];
  }
  showDialogToAdd() {
    this.newCustomer = true;
    this.activeIndex=0;
    this.customer = new customer();
    this.customerAddress=new address();
    this.selectedCity=new city();
    this.displayCustomerDialog = true;
  }

  delete() {
    this.customer.isActive = !this.customer.isActive;
    this.save();
  }
//#region Customer address
selectAddress(customer)
{
  this.addresses=customer.addresses;
this.displayCustomersAddressDialog=true;
}
saveAdress(adres)
{
  var ad=adres;
}
//#endregion 
  //#region Binding
  getCustomers(): any {
    this.loading = true;
    this.customersService.getCustomers(this.config.getCustomersUrl, this.customers)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.customers = items;
          // this.customerAddress=items.address[0];
          this.loading = false;
        }
      },
      error => this.toastr.error('Musteriler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

  getCities() {
    this.commonServices.getAllUnits(this.config.getAllCitiesUrl, this.cities)
      .subscribe(items => {
        if (items != null && items.length != 0) {
          this.cities = items;
        }
      },
      error => this.toastr.error('Tum Sehirler getirilirken hata ile karsilasildi.', 'Error!')
      );
  }
  //#endregion Binding
  findSelectedIndex(): number {
    return this.customers.indexOf(this.selectedCustomer);
  }

  customize(rowData, rowIndex): string {
    return rowData.isActive ? "" : "inactive-row";
  }

}
