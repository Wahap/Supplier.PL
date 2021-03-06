import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { Http, Response, RequestOptions, Headers, HttpModule } from '@angular/http';
import { ConfigService } from './app.config';
import { LoginServiceService } from './login/login.services';
import { BlankPageService } from './layout/blank-page/blank-page.service';
import { ProductsService } from './layout/products/products.service';
import { CommonService } from './shared/common.service';
import { CustomersService } from './layout/customers/customers.service';
import { OrderService } from './layout/order/order.service';
// AoT requires an exported function for factories
// custom-option.ts
import {ToastOptions} from 'ng2-toastr';
import { WaybillService } from './layout/waybills/waybill.service';
import { ConfirmComponent } from './shared/components/confirm/confirm.component';
import { BillService } from './layout/bills/bill.service';
import { AuthService } from './shared/auth.service';
import { VendorBillService } from './layout/vendorBills/vendor-bill.service';
import { CanDeactivateGuard } from './shared/guard/can-deactivate-guard.service';
import { ReturnBillService } from './layout/returnBills/return-bill.service';
import { StockService } from './layout/stock/stock.service';
export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass='toast-top-center';
  dismiss:'click'
}
registerLocaleData(localeDe);
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ToastModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
    ],
    declarations: [AppComponent, ConfirmComponent],
    providers: [AuthGuard, CanDeactivateGuard,ReturnBillService, LoginServiceService,AuthService, ConfigService,
        BlankPageService, ProductsService,VendorBillService, CommonService, CustomersService, OrderService, WaybillService, BillService,StockService,{provide: ToastOptions, useClass: CustomOption},
        [{provide: LocationStrategy, useClass: HashLocationStrategy}]
    ],
    entryComponents: [
        ConfirmComponent
      ],
    bootstrap: [AppComponent]
})
export class AppModule 
{
   
 }
