import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../shared/common.service';
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
  constructor(private commonServices: CommonService, private customersService: CustomersService, private configService: ConfigService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
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
      error => this.toastr.error('Urunler getirilirken hata ile karsilasildi.', 'Error!'),
      () => {
        //finally bloke ..!
        // No errors, route to new page
      }
      );
  }

}
