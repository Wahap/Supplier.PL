import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {
    InputTextModule, DataTableModule, SharedModule, ButtonModule, DialogModule,
    StepsModule, DropdownModule,SliderModule,InputSwitchModule
} from 'primeng/primeng';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/primeng';
import {KeyFilterModule} from 'primeng/keyfilter';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';


import { CancelledOrderComponent } from './order/cancelled-order/cancelled-order.component';
import { ApprovedOrdersComponent } from './order/approved-order/approved-orders.component';
import { ReceivedOrderComponent } from './order/received-order/receivedorder..component';
import { NewWaybillComponent } from './waybills/new-waybill/new-waybill.component';
import { WaybillsListComponent } from './waybills/waybills-list/waybills-list.component';
import { MaterialModule } from './material.module';
import { PdfOrderComponent } from '../pdf-exporter/pdf-order/pdf-order.component';
import { PdfWaybillComponent } from '../pdf-exporter/pdf-waybill/pdf-waybill.component';
import { SaveBillComponent } from './bills/save-bill/save-bill.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PriceGroupsComponent } from './price-groups/price-groups.component';
import { MoneyPipe } from './pipes/money.pipe';
import { WaybillPrintComponent } from './waybills/waybill-print/waybill-print.component';
import { PadLeftPipe } from './pipes/pad-left.pipe';
import { BillPrintComponent } from './bills/bill-print/bill-print.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThisWeekWaybillsComponent } from './waybills/this-week-waybills/this-week-waybills.component';
import { ThisMonthWaybillsComponent } from './waybills/this-month-waybills/this-month-waybills.component';
import { ThisMonthBillsComponent } from './bills/this-month-bills/this-month-bills.component';
import { ThisWeekBillsComponent } from './bills/this-week-bills/this-week-bills.component';
import { NewCityComponent } from '../shared/components/new-city/new-city.component';
import { FilterWaybillsComponent } from './waybills/filter-waybills/filter-waybills.component';
import { FilterBillsComponent } from './bills/filter-bills/filter-bills.component';
import { AnalyzeBillComponent } from './bills/analyze-bill/analyze-bill.component';
import { SaveVendorBillComponent } from './vendorBills/save-vendor-bill/save-vendor-bill.component';
import { VendorBillsListComponent } from './vendorBills/vendor-bills-list/vendor-bills-list.component';
import { VendorBillPrintComponent } from './vendorBills/vendor-bill-print/vendor-bill-print.component';
import { FilterVendorBillsComponent } from './vendorBills/filter-vendor-bills/filter-vendor-bills.component';
import { ThisWeekVendorBillsComponent } from './vendorBills/this-week-vendor-bills/this-week-vendor-bills.component';
import { ThisMonthVendorBillsComponent } from './vendorBills/this-month-vendor-bills/this-month-vendor-bills.component';




@NgModule({
    imports: [
        ImageCropperModule,
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        ChartModule,
        InputTextModule, DataTableModule, SharedModule, ButtonModule, DialogModule, CalendarModule,ProgressSpinnerModule,
        StepsModule, DropdownModule,TableModule,KeyFilterModule,SliderModule,InputSwitchModule,
        MaterialModule
    ],
    declarations: [NewWaybillComponent, PdfWaybillComponent, PdfOrderComponent, LayoutComponent, SidebarComponent, HeaderComponent, ProductsComponent, CustomersComponent, ReceivedOrderComponent,
        ApprovedOrdersComponent,
        CancelledOrderComponent,
        NewWaybillComponent,
        WaybillsListComponent,
        SaveBillComponent,
        BillListComponent,
    PriceGroupsComponent,
    MoneyPipe,
    WaybillPrintComponent,
    PadLeftPipe,
    BillPrintComponent,
    WelcomeComponent,
    ThisWeekWaybillsComponent,
    ThisMonthWaybillsComponent,
    ThisMonthBillsComponent,
    ThisWeekBillsComponent,
    NewCityComponent,
    FilterWaybillsComponent,
    FilterBillsComponent,
    AnalyzeBillComponent,
    SaveVendorBillComponent,
    VendorBillsListComponent,
    VendorBillPrintComponent,
    FilterVendorBillsComponent,
    ThisWeekVendorBillsComponent,
    ThisMonthVendorBillsComponent
    ]
})
export class LayoutModule { }
