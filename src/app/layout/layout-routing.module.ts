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


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'products' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'products',component:ProductsComponent },
            { path: 'customers',component:CustomersComponent },
            { path: 'receivedOrders',component:ReceivedOrderComponent },
            { path: 'approvedOrders',component:ApprovedOrdersComponent },
            { path: 'cancelledOrders',component:CancelledOrderComponent },
            { path: 'newWaybill',component:NewWaybillComponent },
            { path: 'waybills',component:WaybillsListComponent },
            { path: 'savebill',component:SaveBillComponent },
            { path: 'bills',component:BillListComponent },
            { path: 'billList',component:BillListComponent },
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
