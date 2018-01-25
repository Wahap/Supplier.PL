import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {InputTextModule,DataTableModule,SharedModule,ButtonModule,DialogModule, 
    StepsModule,DropdownModule} from 'primeng/primeng';
    import { CalendarModule } from 'primeng/primeng';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ReceivedOrderComponent } from './order/receivedorder..component';
import { ApprovedOrdersComponent } from './order/approved-orders.component';
import { PdfExporterComponent } from '../pdf-exporter/pdf-exporter.component';
import { NewWaybillComponent } from './waybills/new-waybill/new-waybill.component';
import { WaybillsListComponent } from './waybills/waybills-list/waybills-list.component';
import { MaterialModule } from './material.module';




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule.forRoot(),
        FormsModule,
        InputTextModule, DataTableModule, SharedModule,ButtonModule,DialogModule,CalendarModule,
        StepsModule ,DropdownModule,
        MaterialModule
    ],
    declarations: [PdfExporterComponent,LayoutComponent, SidebarComponent, HeaderComponent, ProductsComponent, CustomersComponent, ReceivedOrderComponent,
         ApprovedOrdersComponent,
         NewWaybillComponent,
         WaybillsListComponent]
})
export class LayoutModule {}
