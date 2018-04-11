import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {
    InputTextModule, DataTableModule, SharedModule, ButtonModule, DialogModule,
    StepsModule, DropdownModule
} from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';

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




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        InputTextModule, DataTableModule, SharedModule, ButtonModule, DialogModule, CalendarModule,
        StepsModule, DropdownModule,TableModule,
        MaterialModule
    ],
    declarations: [NewWaybillComponent, PdfWaybillComponent, PdfOrderComponent, LayoutComponent, SidebarComponent, HeaderComponent, ProductsComponent, CustomersComponent, ReceivedOrderComponent,
        ApprovedOrdersComponent,
        CancelledOrderComponent,
        NewWaybillComponent,
        WaybillsListComponent,
        SaveBillComponent,
        BillListComponent]
})
export class LayoutModule { }
