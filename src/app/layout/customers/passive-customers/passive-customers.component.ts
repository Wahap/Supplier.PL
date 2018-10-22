import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../customers.service';
import { ConfigService, IConfig } from '../../../app.config';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-passive-customers',
  templateUrl: './passive-customers.component.html',
  styleUrls: ['./passive-customers.component.scss']
})
export class PassiveCustomersComponent implements OnInit {
  customers: Customer[]=[];
  config: IConfig;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private customersService: CustomersService, private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
  }

  getCustomers(): any {
  
    this.customersService.getPassiveCustomers(this.config.getPassiveCustomersUrl, null)
      .subscribe(items => {
          this.customers = items;

        
      },error=>{
        this.toastr.error("Müşteriler Getirilirken Bir Hata Meydana Geldi...");
      });
  }

}
