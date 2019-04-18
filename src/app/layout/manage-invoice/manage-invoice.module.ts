import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageInvoiceComponent } from './manage-invoice.component';
import { FormsModule } from '@angular/forms';
import { ManageInvoiceRoutingModule } from './manage-invoice-routing.module';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [ManageInvoiceComponent],
  imports: [
    CommonModule,FormsModule,ManageInvoiceRoutingModule,PageHeaderModule
  ]
})
export class ManageInvoiceModule { }
