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
  selectedCity: city;
  loading: boolean;
  config: IConfig;
  customers: customer[];
  selectedCustomer: customer;
  customerAddress: address;
  selectedAddresses: address[];
  newCustomer: boolean;
  displayCustomerDialog: boolean;
  displayCustomersAddressDialog: boolean;
  displayNewAddressDialog: boolean;
  activeButtonText: string;
  activeIndex: number;
  items: any = [];
  constructor(private commonServices: CommonService, private customersService: CustomersService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.activeButtonText = "Pasif Et";
    this.activeIndex = 0;
    this.customerAddress = new address();

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

  //#region Customer 
  save() {
    let customers = [...this.customers];
    this.selectedCity != null ? this.customerAddress.cityId = this.selectedCity.id : "";
    if (this.newCustomer) {
      this.selectedCustomer.isActive = true;
    }
    if (this.selectedCustomer.addresses == null) {
      this.selectedCustomer.addresses = [];
      this.selectedCustomer.addresses.push(this.customerAddress);
    } else {
      this.selectedCustomer.addresses[0] = this.customerAddress;
    }

    this.customersService.saveCustomer(this.config.saveCustomerUrl, this.selectedCustomer)
      .subscribe(result => {
        if (result == true) {
          if (this.newCustomer) {
            this.getCustomers();
          }
          else {
            customers[this.findSelectedIndex()] = this.selectedCustomer;
            this.customers = customers;
            this.selectedCustomer = null;
            this.getCustomers();
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
    this.selectedCustomer = Object.assign({}, event.data);
    this.selectedCity = new city();
    this.activeIndex = 0;
    this.customerAddress = event.data.addresses[0];

    if (event.data.addresses[0] == null) {
      this.customerAddress = new address();
    }
    this.customerAddress.cityId != null ? this.selectedCity = this.cities.filter(x => x.id == this.customerAddress.cityId)[0] : "";
    this.displayCustomerDialog = true;

    //set selected dropdowns values
    this.activeButtonText = this.selectedCustomer.isActive != false ? 'Pasif Et' : 'Aktif Et';

  }
  showDialogToAdd() {
    this.newCustomer = true;
    this.activeIndex = 0;
    this.selectedCustomer = new customer();
    this.customerAddress = new address();
    this.selectedCity = new city();
    this.displayCustomerDialog = true;
  }
  delete() {
    this.selectedCustomer.isActive = !this.selectedCustomer.isActive;
    this.save();
  }
  //#endregion customer
  //#region Customer address
  showDialogToAddAddress() {
    this.customerAddress = new address;
    this.displayNewAddressDialog = true;
  }
  selectAddress(customer) {
    this.selectedAddresses = customer.addresses;
    this.selectedCustomer = customer;
    this.selectedAddresses.forEach((address) => {
      address.city = new city();
      address.city = this.cities.filter(x => x.id == address.cityId)[0];

    });

    this.displayCustomersAddressDialog = true;
  }
  saveOrDeleteAdress(address, saveOrDelete) {
    //save address
    this.loading = true;
    address.customerId = this.selectedCustomer.id;
    if (address.cityId == null) {
      address.cityId = this.selectedCity.id;
    }
    this.customersService.getCustomers(this.config.saveOrDeleteAddress + saveOrDelete, address)
      .subscribe(items => {
        this.loading = false;
        if (saveOrDelete == "saveaddress") {
          this.toastr.success('Adres Basariyla Kaydedildi.', 'Basarili !');
        } else {

          this.toastr.success('Adres Basariyla Silindi.', 'Basarili !');
          this.selectedCustomer.addresses.splice(this.selectedCustomer.addresses.indexOf(address), 1);
        }
        this.displayNewAddressDialog = false;
        this.displayCustomersAddressDialog = false;
        this.getCustomers();
      },
      error => this.toastr.error('Musteriler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        this.loading = false;

      }
      );
  }

  changeSelectedCity(address, city) {
    address.city = this.cities.filter(x => x.id == city.id)[0];
    address.cityId = city.id;

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
