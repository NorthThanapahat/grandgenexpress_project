import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryInvoiceComponent } from './inquiry-invoice.component';
import { InquiryInvoiceRoutingModule } from './inquiry-invoice-routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InquiryInvoiceComponent],
  imports: [
    CommonModule,InquiryInvoiceRoutingModule,FormsModule
  ]
})
export class InquiryInvoiceModule { }
