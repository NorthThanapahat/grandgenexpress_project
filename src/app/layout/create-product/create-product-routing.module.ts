import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
      path: '', component: CreateProductComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateProductRoutingModule { }
