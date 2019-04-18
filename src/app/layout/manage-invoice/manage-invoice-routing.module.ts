import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageInvoiceComponent } from './manage-invoice.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
      path: '', component: ManageInvoiceComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageInvoiceRoutingModule { }
