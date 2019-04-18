import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InquiryInvoiceComponent } from './inquiry-invoice.component';
const routes: Routes = [
  {
      path: '', component: InquiryInvoiceComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryInvoiceRoutingModule { }
