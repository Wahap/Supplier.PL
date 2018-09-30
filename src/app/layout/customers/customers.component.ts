import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { NgForm } from '@angular/forms';
import { CustomersService } from './customers.service';
import { ConfigService, IConfig } from '../../app.config';
import { ToastsManager } from 'ng2-toastr';
import { Customer } from '../../shared/DTOs/customer';
import { Address } from '../../shared/DTOs/address';
import { city } from '../../shared/DTOs/city';
import { CustomerProductPrices } from '../../shared/DTOs/customerProductPrices';
import 'jspdf';
import { findIndex } from 'rxjs/operators';
declare var jsPDF: any; // Important 
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  cities: city[];
  selectedCity: city;
  loading: boolean;
  customerPricesLoading:boolean=true;
  config: IConfig;
  customers: Customer[]=[];
  selectedCustomer: Customer=new Customer();
  customerAddress: Address;
  selectedAddresses: Address[];
  newCustomer: boolean;
  displayCustomerDialog: boolean;
  displayCustomersAddressDialog: boolean;
  diplayCustomerPricesDialog: boolean;
  displayNewAddressDialog: boolean;
  activeButtonText: string;
  customerListColumns: any[];
  addressListColumns: any[];
  customerPrices:CustomerProductPrices[];
  constructor(private commonServices: CommonService, private customersService: CustomersService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.activeButtonText = "Pasif Et";
    this.customerAddress = new Address();

  }


  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
    this.getCities();

    


    this.customerListColumns = [
      { field: 'customerNumber', header: 'Müşteri Numarası' },
      { field: 'companyName', header: 'Firma' },
      { field: 'customerName', header: 'Müşteri' },
      
      { field: 'street', header: 'Sokak' },
      { field: 'postCode', header: 'Posta Kodu' },
      { field: 'city', header: 'Şehir' },
      { field: 'addresses', header: 'Adresler' },
      { field: 'priceList', header: 'Fiyatlar' }
    ];

    this.addressListColumns = [
      { field: 'branchName', header: 'Şube' },
      { field: 'street', header: 'Cadde' },
      { field: 'postCode', header: 'Posta Kodu' },
      { field: 'city', header: 'Şehir' },
      { field: 'kaydet', header: 'Kaydet' },
      { field: 'sil', header: 'Sil' }
    ];

   
  }

  exportCustomersAsPdf()
  {
    var doc = new jsPDF('l', 'mm', 'a4');
    var col = ["Firma","Müsteri","EMail","Telefon","Adres"];
    var rows = [];

    this.customers.forEach(function (element) {

      var row = [];
      row.push(element.companyName);
      row.push(element.customerName+" "+element.lastname);
      row.push(element.eMail);
      row.push(element.phone);
      if(element.addresses.length>0)
      {
        let firstAddress=element.addresses[0];
        if(firstAddress.city==null)
        {
          firstAddress.city={ id:null, name:'-' };
        }
        row.push(firstAddress.street+","+firstAddress.postCode+","+firstAddress.city.name);
      }
      else
      {
        row.push("-");
      }
      
      rows.push(row);
    });
    doc.autoTable(col, rows);
    doc.save('customers.pdf');
  }
  //#region Customer 
  save() {
    if(this.selectedCustomer.id==0)//new customer
    {
      this.selectedCustomer.isActive=true;
      this.customerAddress.isActive=true;
      this.customerAddress.cityId=this.selectedCity.id;
      this.selectedCustomer.addresses.push(this.customerAddress);
    }
    else//customer has been updating
    {
      if(this.selectedCustomer.addresses.length>0)//Existing customer has at least 1 address
      {
        this.selectedCustomer.addresses[0].city=this.selectedCity;
        this.selectedCustomer.addresses[0].cityId=this.selectedCity.id;
      }
      else//Existing customer doesnt have any address before
      {
 
      this.customerAddress.customerId=this.selectedCustomer.id;
        this.customerAddress.isActive=true;
      this.customerAddress.cityId=this.selectedCity.id;
        this.selectedCustomer.addresses.push(this.customerAddress);
      }
     
    }
   
    
 

    this.customersService.saveCustomer(this.config.saveCustomerUrl, this.selectedCustomer)
      .subscribe((customer:Customer) => {
        this.toastr.success('Müşteri Basariyla Kaydedildi.', 'OK !');
        this.displayCustomerDialog=false;
        this.getCustomers();
        
      });
    }
        
  onRowSelect(cust) {
    this.newCustomer = false;
    this.selectedCustomer = Object.assign({}, cust);
    this.selectedCity = new city();
    this.customerAddress = cust.addresses[0];

    if (cust.addresses[0] == null) {
      this.customerAddress = new Address();
    }
    this.customerAddress.cityId != null ? this.selectedCity = this.cities.filter(x => x.id == this.customerAddress.cityId)[0] : "";
    this.displayCustomerDialog = true;

    //set selected dropdowns values
    this.activeButtonText = this.selectedCustomer.isActive != false ? 'Pasif Et' : 'Aktif Et';

  }
  showDialogToAdd() {
    this.newCustomer = true;
    this.selectedCustomer = new Customer();
    this.customerAddress = new Address();
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
    this.customerAddress = new Address();
    this.displayNewAddressDialog = true;
  }
  onSelectAddresses(customer) {
    this.selectedAddresses = customer.addresses;
    this.selectedCustomer = customer;
    this.selectedAddresses.forEach((address) => {
      address.city = new city();
      address.city = this.cities.filter(x => x.id == address.cityId)[0];

    });

    this.displayCustomersAddressDialog = true;
  }
  onSelectCustomerPrice(customer) {
    this.diplayCustomerPricesDialog = true;
    this.customersService.getCustomerPrices(this.config.getCustomerPricesUrl,customer).subscribe(response=>{
      this.customerPricesLoading=false;
      this.customerPrices=response;
      
    });
  }

  saveCustomerPrice(customerPrice:CustomerProductPrices)
  {
    this.customersService.saveCustomerProductPrice(this.config.saveCustomerProductPriceUrl,customerPrice).subscribe(response=>{
      this.toastr.success('Fiyat Basariyla Kaydedildi.', 'Basarili !');

    },error=>{
      this.toastr.error('Fiyat Kaydedilirken Bir Hata Meydana Geldi', 'Hata!')
    });
  }
  saveAddress(address:Address) {
    //save address
    address.isActive=true;
    if(address.id>0)//Existing Address (Updating)
    {
      address.cityId=address.city.id;
    }
    else//Creating new address
    {
      address.cityId=this.selectedCity.id;
    }
    
    address.customerId=this.selectedCustomer.id;
    this.customersService.saveCustomerAddress(this.config.saveAddressUrl,address).subscribe((savedAddress:Address)=>{
      this.displayNewAddressDialog=false;
      if(address.id==0 || address.id==undefined)
      {
        //new Address
        savedAddress.city=this.selectedCity;
        this.customers[this.findSelectedCustomerIndex()].addresses.push(savedAddress);
      }
      else
      {
        //Address Updating...
      }
      this.toastr.success("Adres Kaydedildi...")
    });
  }

  deleteAddress(address:Address) {
    if (confirm("Adresi silmek istediğinize emin misiniz?")) {
      this.customersService.deleteCustomerAddress(this.config.deleteAddressUrl,address).subscribe(response=>{
        //hide deleted address
        this.selectedAddresses=this.selectedAddresses.filter(x=>x.id!=address.id);
      });
    }
    
   
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
  findSelectedCustomerIndex(): number {
    return this.customers.indexOf(this.selectedCustomer);
  }

  customize(rowData, rowIndex): string {
    return rowData.isActive ? "" : "inactive-row";
  }
  windowsHeight() {
    return (window.screen.height * 0.80 - 120) + "px";
  }

  filterCustomersByCity(filteredCityId:number,cust:Customer)
  {
    //console.log(cust);
    if(filteredCityId==undefined || filteredCityId==0)
    {
      return true;
    }
    else if(cust.addresses.length==0)
    {
      return false;
    }
   else if(cust.addresses[0].city==null)
   {
    return false;
   }
    else 
    {
     return cust.addresses[0].city.id==filteredCityId;
    }
  }

}
