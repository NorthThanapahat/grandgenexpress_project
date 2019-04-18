import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InquiryInvoiceComponent } from './inquiry-invoice/inquiry-invoice.component';
import { LedgerAccoutEnquiryComponent } from './ledger-accout-enquiry/ledger-accout-enquiry.component';
import { ReportComponent } from './report/report.component';
import { ClosingStockReportComponent } from './closing-stock-report/closing-stock-report.component';
import { StockLedgerReportComponent } from './stock-ledger-report/stock-ledger-report.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { ManageInvoiceComponent } from './manage-invoice/manage-invoice.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule ,
        FormsModule],
        providers:[{provide: LocationStrategy, useClass: HashLocationStrategy}],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LedgerAccoutEnquiryComponent, ClosingStockReportComponent, StockLedgerReportComponent]
})
export class LayoutModule {}
