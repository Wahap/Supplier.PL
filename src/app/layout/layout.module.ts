import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {InputTextModule,DataTableModule,SharedModule,ButtonModule,DialogModule, 
    StepsModule,DropdownModule} from 'primeng/primeng';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';

import { PdfExporterComponent } from '../pdf-exporter/pdf-exporter.component';
import { CancelledOrderComponent } from './order/cancelled-order/cancelled-order.component';
import { ApprovedOrdersComponent } from './order/approved-order/approved-orders.component';
import { ReceivedOrderComponent } from './order/received-order/receivedorder..component';




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        InputTextModule, DataTableModule, SharedModule,ButtonModule,DialogModule,
        StepsModule ,DropdownModule
    ],
    declarations: [PdfExporterComponent,LayoutComponent, SidebarComponent, HeaderComponent, ProductsComponent, CustomersComponent, ReceivedOrderComponent,
         ApprovedOrdersComponent,
         CancelledOrderComponent]
})
export class LayoutModule {}
