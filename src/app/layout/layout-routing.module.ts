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
import { FilterVendorBillsComponent } from './vendorBills/filter-vendor-bills/filter-vendor-bills.component';
import { SaveVendorBillComponent } from './vendorBills/save-vendor-bill/save-vendor-bill.component';
import { VendorBillsListComponent } from './vendorBills/vendor-bills-list/vendor-bills-list.component';
import { ThisWeekVendorBillsComponent } from './vendorBills/this-week-vendor-bills/this-week-vendor-bills.component';
import { ThisMonthVendorBillsComponent } from './vendorBills/this-month-vendor-bills/this-month-vendor-bills.component';
import { PassiveProductsComponent } from './products/passive-products/passive-products.component';
import { PassiveCustomersComponent } from './customers/passive-customers/passive-customers.component';
import { CanDeactivateGuard } from '../shared/guard/can-deactivate-guard.service';
import { FilterReturnBillsComponent } from './returnBills/filter-return-bills/filter-return-bills.component';
import { SaveReturnBillComponent } from './returnBills/save-return-bill/save-return-bill.component';
import { ReturnBillListComponent } from './returnBills/return-bill-list/return-bill-list.component';
import { ThisWeekReturnBillsComponent } from './returnBills/this-week-return-bills/this-week-return-bills.component';
import { ThisMonthReturnBillsComponent } from './returnBills/this-month-return-bills/this-month-return-bills.component';
import { UnpaidBillsComponent } from './bills/unpaid-bills/unpaid-bills.component';
import { OverDueBillsComponent } from './bills/over-due-bills/over-due-bills.component';
import { BillReportsComponent } from './bills/bill-reports/bill-reports.component';
import { YearlyBillReportComponent } from './bills/yearly-bill-report/yearly-bill-report.component';
import { MonthlyBillReportComponent } from './bills/monthly-bill-report/monthly-bill-report.component';
import { TopCustomersReportComponent } from './customers/top-customers-report/top-customers-report.component';
import { WareHouseListComponent } from './wareHouses/ware-house-list/ware-house-list.component';
import { WareHouseDetailsComponent } from './wareHouses/ware-house-details/ware-house-details.component';
import { TopProductsReportComponent } from './products/top-products-report/top-products-report.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'welcome' },
            { path: 'welcome',component:WelcomeComponent },
            { path: 'products',component:ProductsComponent },
            { path: 'passiveProducts',component:PassiveProductsComponent },
            { path: 'customers',component:CustomersComponent },
            { path: 'passiveCustomers',component:PassiveCustomersComponent },
            { path: 'receivedOrders',component:ReceivedOrderComponent },
            { path: 'approvedOrders',component:ApprovedOrdersComponent },
            { path: 'cancelledOrders',component:CancelledOrderComponent },
            { path: 'newWaybill',component:NewWaybillComponent,canDeactivate: [CanDeactivateGuard] },
            { path: 'thisWeekWaybills',component:ThisWeekWaybillsComponent },
            { path: 'thisMonthWaybills',component:ThisMonthWaybillsComponent },
           
            { path: 'waybills',component:WaybillsListComponent },
            { path: 'filteredWaybills',component:FilterWaybillsComponent },
            { path: 'filteredBills',component:FilterBillsComponent },
            { path: 'savebill',component:SaveBillComponent,canDeactivate: [CanDeactivateGuard] },
            { path: 'bills',component:BillListComponent },
            { path: 'thisWeekBills',component:ThisWeekBillsComponent },
            { path: 'thisMonthBills',component:ThisMonthBillsComponent },
            { path: 'unpaidBills',component:UnpaidBillsComponent },
            { path: 'overDueBills',component:OverDueBillsComponent },
            { path: 'billReports',component:BillReportsComponent,
            children:[
                { path:'yearly',component:YearlyBillReportComponent },
                { path:'monthly',component:MonthlyBillReportComponent },
                { path:'topCustomers',component:TopCustomersReportComponent },
                { path:'topProducts',component:TopProductsReportComponent }
            ]
        
        },
        { path: 'wareHouses',component:WareHouseListComponent },
        { path: 'wareHouse/details/:id',component:WareHouseDetailsComponent },

            { path: 'filteredVendorBills',component:FilterVendorBillsComponent },
            { path: 'saveVendorBill',component:SaveVendorBillComponent },
            { path: 'vendorBills',component:VendorBillsListComponent },
            { path: 'thisWeekVendorBills',component:ThisWeekVendorBillsComponent },
            { path: 'thisMonthVendorBills',component:ThisMonthVendorBillsComponent },

            { path: 'filteredReturnBills',component:FilterReturnBillsComponent },
            { path: 'saveReturnBill',component:SaveReturnBillComponent },
            { path: 'returnBills',component:ReturnBillListComponent },
            { path: 'thisWeekReturnBills',component:ThisWeekReturnBillsComponent },
            { path: 'thisMonthReturnBills',component:ThisMonthReturnBillsComponent },


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
