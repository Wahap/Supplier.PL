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
import { ReceivedOrderComponent } from './order/receivedorder..component';
import { ApprovedOrdersComponent } from './order/approved-orders.component';





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
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, ProductsComponent, CustomersComponent, ReceivedOrderComponent, ApprovedOrdersComponent]
})
export class LayoutModule {}
