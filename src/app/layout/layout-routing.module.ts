import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component:LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix'},
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'manage-user', loadChildren:'./manage-user/manage-user.module#ManageUserModule'},
            { path:'new-user' ,loadChildren:'./create-user-modal/create-user-module.module#CreateUserModuleModule'},
            { path:'create-invoice' ,loadChildren:'./create-invoice/create-invoice.module#CreateInvoiceModule'},
            { path:'product' ,loadChildren:'./manage-product/manage-product.module#ManageProductModule'},
            { path:'create-product' ,loadChildren:'./create-product/create-product.module#CreateProductModule'},
            { path:'manage-invoice' ,loadChildren:'./manage-invoice/manage-invoice.module#ManageInvoiceModule'},
            { path:'inquiry-invoice' ,loadChildren:'./inquiry-invoice/inquiry-invoice.module#InquiryInvoiceModule'},
            { path:'report' ,loadChildren:'./report/report.module#ReportModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
