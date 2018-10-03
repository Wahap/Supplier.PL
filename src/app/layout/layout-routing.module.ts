import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ReceivedOrderComponent } from './order/received-order/receivedorder..component';
import { ApprovedOrdersComponent } from './order/approved-order/approved-orders.component';
import { CancelledOrderComponent } from './order/cancelled-order/cancelled-order.component';

import { NewWaybillComponent } from './waybills/new-waybill/new-waybill.component';
import { WaybillsListComponent } from './waybills/waybills-list/waybills-list.component';
import { SaveBillComponent } from './bills/save-bill/save-bill.component';
import { BillListComponent } from './bills/bill-list/bill-list.component';
import { PriceGroupsComponent } from './price-groups/price-groups.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThisWeekWaybillsComponent } from './waybills/this-week-waybills/this-week-waybills.component';
import { ThisMonthWaybillsComponent } from './waybills/this-month-waybills/this-month-waybills.component';
import { ThisWeekBillsComponent } from './bills/this-week-bills/this-week-bills.component';
import { ThisMonthBillsComponent } from './bills/this-month-bills/this-month-bills.component';
import { FilterWaybillsComponent } from './waybills/filter-waybills/filter-waybills.component';
import { FilterBillsComponent } from './bills/filter-bills/filter-bills.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'welcome' },
            { path: 'welcome',component:WelcomeComponent },
            { path: 'products',component:ProductsComponent },
            { path: 'customers',component:CustomersComponent },
            { path: 'receivedOrders',component:ReceivedOrderComponent },
            { path: 'approvedOrders',component:ApprovedOrdersComponent },
            { path: 'cancelledOrders',component:CancelledOrderComponent },
            { path: 'newWaybill',component:NewWaybillComponent },
            { path: 'thisWeekWaybills',component:ThisWeekWaybillsComponent },
            { path: 'thisMonthWaybills',component:ThisMonthWaybillsComponent },
            { path: 'thisWeekBills',component:ThisWeekBillsComponent },
            { path: 'thisMonthBills',component:ThisMonthBillsComponent },
            { path: 'waybills',component:WaybillsListComponent },
            { path: 'filteredWaybills',component:FilterWaybillsComponent },
            { path: 'filteredBills',component:FilterBillsComponent },
            { path: 'savebill',component:SaveBillComponent },
            { path: 'bills',component:BillListComponent },
            { path: 'billList',component:BillListComponent },
            { path: 'priceGroups',component:PriceGroupsComponent },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
