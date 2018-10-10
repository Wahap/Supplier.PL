import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../shared/DTOs/customer';
import { CustomersService } from '../customers.service';
import { ConfigService, IConfig } from '../../../app.config';

@Component({
  selector: 'app-passive-customers',
  templateUrl: './passive-customers.component.html',
  styleUrls: ['./passive-customers.component.scss']
})
export class PassiveCustomersComponent implements OnInit {
  customers: Customer[]=[];
  config: IConfig;
  constructor( private customersService: CustomersService, private configService: ConfigService) { }

  ngOnInit() {
    this.config = this.configService.getAppConfig();
    this.getCustomers();
  }

  getCustomers(): any {
  
    this.customersService.getPassiveCustomers(this.config.getPassiveCustomersUrl, null)
      .subscribe(items => {
          this.customers = items;

        
      });
  }

}
