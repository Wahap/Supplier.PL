import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../shared/DTOs/product';
import { ConfigService, IConfig } from '../../../app.config';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
 @Input() product:Product;
 config:IConfig;
  constructor(private configService:ConfigService,) { }

  ngOnInit() {
    this.config=this.configService.getAppConfig();

  }

  ngOnChanges() {

    if (this.product==undefined) {
      this.product=new Product();
    }
  }



}
